"""P1 candidate authoring in Blender 5.1. CC0 Quaternius base + authored clothes/props.
Not final art. Run with Blender --background --python this_file -- SOURCE OUTPUT.
"""
import bpy, bmesh, math, sys, json
from pathlib import Path
from mathutils import Vector, Matrix
args=sys.argv[sys.argv.index('--')+1:]
source=Path(args[0]); out=Path(args[1]);out.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=str(source))
rig=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE')
body=next(o for o in bpy.context.scene.objects if o.name.startswith('SuperHero'))
for o in list(bpy.context.scene.objects):
 if o.name.startswith('Icosphere'):bpy.data.objects.remove(o,do_unlink=True)
def mat(name,color,metal=0,rough=.65):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
 n=m.node_tree.nodes.get('Principled BSDF');n.inputs['Base Color'].default_value=(*color,1);n.inputs['Metallic'].default_value=metal;n.inputs['Roughness'].default_value=rough
 return m
skin=mat('candidate_skin',(.52,.285,.18),rough=.7)
jacket=mat('candidate_teal_fabric',(.022,.205,.195));pants=mat('candidate_navy_fabric',(.035,.055,.09));shoes=mat('candidate_rubber',(.024,.029,.031));trim=mat('candidate_reflective_trim',(.73,.75,.7),.1,.4)
body.data.materials.clear()
for m in [skin,jacket,pants,shoes]:body.data.materials.append(m)
# A loose shell follows the original rig weights; original face/hands retain real topology.
for p in body.data.polygons:
 c=sum((body.data.vertices[i].co for i in p.vertices),Vector())/len(p.vertices)
 p.material_index=3 if c.z<.12 else 2 if c.z<.99 else 1 if c.z<1.55 and abs(c.x)<.67 else 0
for v in body.data.vertices:
 if .99<v.co.z<1.55 and abs(v.co.x)<.67:v.co+=v.normal*.016
 if .13<v.co.z<.99:v.co+=v.normal*.007
# Runtime materials use the first UV only; inherited unused UV/color streams
# exceed the portable WebGPU eight-buffer limit on the source face meshes.
for o in bpy.context.scene.objects:
 if o.type=='MESH':
  for uv in list(o.data.uv_layers)[1:]:o.data.uv_layers.remove(uv)
  for color in list(o.data.color_attributes):o.data.color_attributes.remove(color)
# Remove missing normal-map links supplied in the original glTF. Keep existing eye color texture.
for o in bpy.context.scene.objects:
 if o.type=='MESH':
  for p in o.data.polygons:p.use_smooth=True
  for m in o.data.materials:
   if m and m.use_nodes:
    for n in list(m.node_tree.nodes):
     if n.type=='TEX_IMAGE' and (not n.image or n.image.size[0]==0):m.node_tree.nodes.remove(n)
black=mat('helmet_strap',(.025,.028,.025));helmetmat=mat('candidate_helmet',(.035,.28,.265),.12,.35)
def bind(o,bone):
 g=o.vertex_groups.new(name=bone);g.add(list(range(len(o.data.vertices))),1,'REPLACE')
 mo=o.modifiers.new('Rig','ARMATURE');mo.object=rig;o.parent=rig
# Open-face helmet has a rounded shell, brim and straps, no brand/canon identity.
bpy.ops.mesh.primitive_uv_sphere_add(segments=32,ring_count=16,location=(0,.025,1.721));h=bpy.context.object;h.name='candidate_open_face_helmet';h.scale=(.127,.137,.126)
bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
bm=bmesh.new();bm.from_mesh(h.data);bmesh.ops.delete(bm,geom=[v for v in bm.verts if v.co.z<-.032],context='VERTS');bm.to_mesh(h.data);bm.free();h.data.materials.append(helmetmat);bind(h,'Head')
bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=8,location=(0,-.105,1.701));h=bpy.context.object;h.name='helmet_brim';h.scale=(.128,.06,.012);h.data.materials.append(helmetmat);bind(h,'Head')
for side in [-1,1]:
 bpy.ops.mesh.primitive_cube_add(size=1,location=(side*.083,.0,1.626));h=bpy.context.object;h.name='helmet_strap';h.scale=(.012,.017,.139);h.data.materials.append(black);bind(h,'Head')
def reset_pose():
 for p in rig.pose.bones:p.rotation_mode='QUATERNION';p.rotation_quaternion=(1,0,0,0);p.location=(0,0,0);p.scale=(1,1,1)
 bpy.context.view_layer.update()
def aim(name,direction):
 p=rig.pose.bones[name];bpy.context.view_layer.update();v=(p.tail-p.head).normalized();q=v.rotation_difference(Vector(direction).normalized());head=p.head.copy()
 p.matrix=Matrix.Translation(head)@q.to_matrix().to_4x4()@Matrix.Translation(-head)@p.matrix;bpy.context.view_layer.update()
def pose(point=False,talk=0):
 reset_pose()
 aim('upperarm_l',(1,0,.14) if point else (.13,-.09,-1));aim('lowerarm_l',(1,0,.12) if point else (.06,-.18,-1))
 aim('upperarm_r',(-.13,-.09,-1));aim('lowerarm_r',(-.06,-.18,-1))
 if talk:rig.pose.bones['Head'].rotation_quaternion=Vector((1,0,0)).rotation_difference(Vector((1,0,talk)))
 if point:
  for f in ['middle','ring','pinky']:
   for j in [1,2,3]:rig.pose.bones[f'{f}_{j:02}_l'].rotation_mode='QUATERNION';rig.pose.bones[f'{f}_{j:02}_l'].rotation_quaternion=Vector((0,1,0)).rotation_difference(Vector((0,1,.8)))
for name in ['driver_idle','driver_talk','driver_point']:
 rig.animation_data_create();rig.animation_data.action=bpy.data.actions.new(name)
 for frame in [1,20,45,70,90]:
  pose(point=name=='driver_point' and 20<=frame<=70,talk=.025*math.sin(frame*.1) if name=='driver_talk' else 0)
  for p in rig.pose.bones:
   p.keyframe_insert(data_path='rotation_quaternion' if p.rotation_mode=='QUATERNION' else 'rotation_euler',frame=frame,group=p.name)
 rig.animation_data.action.use_fake_user=True
rig.animation_data.action=None;pose()
bpy.context.scene.frame_start=1;bpy.context.scene.frame_end=90
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=str(out/'driver_candidate.glb'),export_format='GLB',use_selection=True,export_animation_mode='ACTIONS',export_yup=True)
# POV forearm/hand uses the actual CC0 anatomical mesh, baked from its articulated finger rig.
for grip in [False,True]:
 reset_pose()
 if grip:
  for f in ['index','middle','ring','pinky']:
   for j in [1,2,3]:p=rig.pose.bones[f'{f}_{j:02}_r'];p.rotation_mode='XYZ';p.rotation_euler.x=.5 if j==1 else .75
 bpy.context.view_layer.update();ev=body.evaluated_get(bpy.context.evaluated_depsgraph_get());mesh=bpy.data.meshes.new_from_object(ev)
 obj=bpy.data.objects.new('pov_grip' if grip else 'pov_wave',mesh);bpy.context.collection.objects.link(obj)
 bm=bmesh.new();bm.from_mesh(mesh);bmesh.ops.delete(bm,geom=[v for v in bm.verts if v.co.x>-.485],context='VERTS');bm.to_mesh(mesh);bm.free()
 pivot=Vector((-.706,.0654,1.4555));rot=Matrix.Rotation(math.pi/2,4,'Y')
 for v in mesh.vertices:v.co=rot.to_3x3()@(v.co-pivot)
 for p in mesh.polygons:p.use_smooth=True
 bpy.ops.object.select_all(action='DESELECT');obj.select_set(True)
 bpy.ops.export_scene.gltf(filepath=str(out/(obj.name+'.glb')),export_format='GLB',use_selection=True,export_animations=False)
 bpy.data.objects.remove(obj,do_unlink=True)
# Authored stylized vehicle/props. Distinct components/pivots exported for integration.
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def cube(name,loc,size,m,bevel=0):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.scale=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(m)
 if bevel:mod=o.modifiers.new('Rounded edges','BEVEL');mod.width=bevel;mod.segments=3;bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
 return o
def cyl(name,loc,r,depth,m,axis='Z'):
 bpy.ops.mesh.primitive_cylinder_add(vertices=24,radius=r,depth=depth,location=loc);o=bpy.context.object;o.name=name;o.data.materials.append(m)
 if axis=='Y':o.rotation_euler.x=math.pi/2
 if axis=='X':o.rotation_euler.y=math.pi/2
 for p in o.data.polygons:p.use_smooth=True
 return o
def export(name):
 bpy.ops.object.select_all(action='SELECT');bpy.ops.export_scene.gltf(filepath=str(out/name),export_format='GLB',use_selection=True,export_animations=False)
 bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
white=mat('bus_ivory',(.8,.81,.73),.15,.38);red=mat('bus_red',(.58,.055,.035),.2,.35);glass=mat('blue_dark_glass',(.033,.083,.11),.3,.16);metal=mat('brushed_metal',(.43,.49,.51),.8,.25);rubber=mat('tire_rubber',(.018,.021,.023));light=mat('lamp_ivory',(.96,.91,.6));seat=mat('seat_fabric',(.18,.28,.3))
# Bus forward is +X, Y (Blender) width, Z height. Runtime export gives +X forward.
cube('bus_body',(0,0,1.5),(8.6,2.3,2.5),white,.22)
cube('red_lower_body',(0,0,.72),(8.65,2.32,.82),red,.12)
cube('roof',(-.1,0,2.83),(8.4,2.22,.18),white,.08)
for side in [-1,1]:
 for i in range(6):
  cube('window_'+str(i),(i*1.12-2.6,side*1.164,2.06),(1.04,.028,1.06),glass,.055)
 cube('door_frame',(3.14,side*1.174,1.26),(1.05,.04,2.35),rubber,.025)
 for j in [-1,1]:cube('door_glass',(3.14+j*.245,side*1.201,1.42),(.43,.018,1.7),glass,.02)
 for x in [-2.85,2.6]:
  cyl('wheel',(x,side*1.15,.49),.49,.27,rubber,'Y');cyl('wheel_hub',(x,side*1.3,.49),.26,.035,metal,'Y')
 cube('mirror_arm',(4.08,side*1.3,2.31),(.09,.44,.065),metal,.02)
 cube('mirror',(4.06,side*1.52,2.24),(.12,.08,.38),rubber,.04)
cube('front_windshield',(4.31,0,2.01),(.035,1.95,1.07),glass,.09)
cube('destination_display',(4.34,0,2.65),(.035,1.65,.25),rubber,.03)
for side in [-1,1]:cube('headlamp',(4.36,side*.79,.82),(.025,.37,.2),light,.06)
for x in [-4.37,4.39]:cube('bumper',(x,0,.38),(.13,2.17,.17),rubber,.05)
export('bus_candidate.glb')
# Scooter: rounded body, realistic wheelbase and separate controls, no copied brand.
teal=mat('scooter_teal',(.055,.21,.19),.3,.3)
for x in [-.69,.69]:
 cyl('scooter_wheel',(x,0,.32),.29,.14,rubber,'Y');cyl('scooter_hub',(x,-.085,.32),.15,.018,metal,'Y')
cube('floorboard',(-.05,0,.37),(.72,.39,.12),teal,.05)
cube('rear_body',(-.49,0,.62),(.78,.45,.41),teal,.16)
cube('seat',(-.41,0,.91),(.86,.4,.12),rubber,.05)
cube('front_fairing',(.5,0,.66),(.28,.43,.83),teal,.1)
cyl('steering_column',(.61,0,.83),.047,.53,metal)
cyl('handlebar',(.58,0,1.05),.028,.69,rubber,'Y')
for side in [-1,1]:
 cyl('mirror_stem',(.57,side*.32,1.22),.012,.32,metal)
 cube('scooter_mirror',(.58,side*.32,1.39),(.16,.075,.11),metal,.04)
cube('scooter_headlight',(.7,0,.94),(.022,.29,.19),light,.045)
export('scooter_candidate.glb')
# Phone front faces -Z in runtime. Dynamic screen is bound by node name in-game.
cube('phone_frame',(0,0,0),(.079,.011,.163),rubber,.006)
cube('phone_screen',(0,-.0061,0),(.069,.001,.145),glass,.003)
cube('phone_button',(.040,0,.022),(.003,.004,.025),metal,.001)
export('phone_candidate.glb')
print('CANDIDATES',[(p.name,p.stat().st_size) for p in out.glob('*.glb')])
