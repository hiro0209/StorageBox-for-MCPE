var versionname="1.2.1";
var invco=[];
var boxdata=[];
var boxdatasub={};
var boxdata2=[];
var boxdatasub2={};
var tapchestinfo=[];
var dropitems=[];
var deathedgoldbox=[];
var viewscreen=false;
var flag=false;
var viewchestbutton=false;
var deathplayer=false;
var resetinvco=true;
var autocollection=true;
var allitem=0;
var allitemdata=0;
var maxinvcount=0;
var count=0;
var count2=0;
var selectslot=null;
var chestbutton=null;
var font;


var GUI=(function(){
	var Button=android.widget.Button;
	var ImageView=android.widget.ImageView;
	var ImageButton=android.widget.ImageButton;
	var SeekBar=android.widget.SeekBar;
	var FrameLayout=android.widget.FrameLayout;
	var LinearLayout=android.widget.LinearLayout;
	var TextView=android.widget.TextView;
	var EditText=android.widget.EditText;
	var ProgressBar=android.widget.ProgressBar;
	var ListView=android.widget.ListView;
	var Dialog=android.app.Dialog;
	var AlertDialog=android.app.AlertDialog.Builder;
	var GridLayout=android.widget.GridLayout;
	var ScrollView=android.widget.ScrollView;
	var RelativeLayout=android.widget.RelativeLayout;
	var Toolbar=android.widget.Toolbar;
	var Color=android.graphics.Color;
	var Gravity=android.view.Gravity;
	var PopupWindow=android.widget.PopupWindow;
	var OnClickListener=android.view.View.OnClickListener;
	var OnTouchListener=android.view.View.OnTouchListener;
	var OnLongClickListener=android.view.View.OnLongClickListener;
	var OnItemClickListener=android.widget.AdapterView.OnItemClickListener;
	var MotionEvent=android.view.MotionEvent;
	var ViewConfiguration=android.view.ViewConfiguration;
	var TypedValue=android.util.TypedValue;
	var Typeface=android.graphics.Typeface;
	var Build=android.os.Build;
	var View=android.view.View;
	var ViewGroup=android.view.ViewGroup;
	var ArrayAdapter=android.widget.ArrayAdapter;
	var ArrayList=java.util.ArrayList;
	var Collections=java.util.Collections;
	var setting_screen=[];
	var backs=[];
	var allbuttons=[];
	var items=[];
	return{
		uiThread:function(content){
			ctx.runOnUiThread(
				new java.lang.Runnable({
					run:function(){
						try{
							content();
						}catch(e){
							saveError(e);
						}
					}
				})
			);
		},
		popUpWindow:function(obj,view,info){
			gui=new PopupWindow(view,info[0],info[1]);
			gui.showAtLocation(ctx.getWindow().getDecorView(),info[2]|info[3],info[4],info[5]);
			obj.push(gui);
			obj.push(view);
		},
		addSettingScreen:function(){
			GUI.uiThread(function(){
				flag=false;
				let display=ctx.getWindowManager().getDefaultDisplay();
				let point=new android.graphics.Point();
				display.getSize(point);
				//レイアウト
				let mainlayout=new RelativeLayout(ctx);
				//背景
				let backs=new LinearLayout(ctx);
				let backlayout=new RelativeLayout.LayoutParams(point.x,point.y);
				backs.setOrientation(LinearLayout.VERTICAL);
				backs.setId(1);
				backlayout.addRule(RelativeLayout.CENTER_IN_PARENT);
				mainlayout.addView(backs,backlayout);
				if(Build.VERSION.SDK_INT>=21){
					//ヘッダー
					let header=new Toolbar(ctx);
					GUI.setBackground(header,topbarimage);
					backs.addView(header);
					//タイトル
					let title=new TextView(ctx);
					let titlelayout=new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);
					if(Player.getItemCustomName(Player.getSelectedSlotId())!=null){
						title.setText(Player.getItemCustomName(Player.getSelectedSlotId()));
					}else{
						title.setText(Item.getName(Player.getInventorySlot(Player.getSelectedSlotId()),Player.getInventorySlotData(Player.getSelectedSlotId()),false));
					}
					title.setTextSize(15);
					title.setTextColor(Color.WHITE);
					title.setTypeface(font);
					title.setY(Height(34));
					titlelayout.addRule(RelativeLayout.CENTER_HORIZONTAL);
					titlelayout.addRule(RelativeLayout.ALIGN_PARENT_TOP);
					mainlayout.addView(title,titlelayout);
					//メイン
					let main=new ImageView(ctx);
					GUI.setBackground(main,backgroundimage);
					backs.addView(main);
				}else if(Build.VERSION.SDK_INT<21){
					//ヘッダー
					let header=new ImageView(ctx);
					let headerparams=new android.view.ViewGroup.LayoutParams(Width(4000),BarHeight());
					GUI.setBackground(header,topbarimage);
					backs.addView(header,headerparams);
					//タイトル
					let title=new TextView(ctx);
					let titlelayout=new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);
					if(Player.getItemCustomName(Player.getSelectedSlotId())!=null){
						title.setText(Player.getItemCustomName(Player.getSelectedSlotId()));
					}else{
						title.setText(Item.getName(Player.getInventorySlot(Player.getSelectedSlotId()),Player.getInventorySlotData(Player.getSelectedSlotId()),false));
					}
					title.setTextSize(15);
					title.setTextColor(Color.WHITE);
					title.setTypeface(font);
					title.setY(Height(34));
					titlelayout.addRule(RelativeLayout.CENTER_HORIZONTAL);
					titlelayout.addRule(RelativeLayout.ALIGN_PARENT_TOP);
					mainlayout.addView(title,titlelayout);
					//メイン
					let main=new ImageView(ctx);
					GUI.setBackground(main,backgroundimage);
					backs.addView(main);
				}
				//バックボタン
				let backbutton=new ImageButton(ctx);
				let backbuttonlayout=new RelativeLayout.LayoutParams(Width(100),Height(100));
				GUI.setBackground(backbutton,backbuttonimage);
				backbutton.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								GUI.setBackground(backbutton,backbuttonimage_push);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								GUI.setBackground(backbutton,backbuttonimage);
							}
							return false;
						}
					}
				);
				backbutton.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							Level.playSoundEnt(getPlayerEnt(),"random.click",500,1);
							GUI.backSettingScreen();
						}
					}
				);
				backbutton.setY(Height(10));
				backbuttonlayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
				backbuttonlayout.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(backbutton,backbuttonlayout);
				//名前変更
				let nameset=new Button(ctx);
				let namesetlayout=new RelativeLayout.LayoutParams(Width(810),Height(146));
				GUI.setBackground(nameset,namesetimage);
				nameset.setTextColor(Color.WHITE);
				if(ModPE.getLanguage()=="ja_JP"){
					nameset.setText("名前を変える");
				}else{
					nameset.setText("Change name");
				}
				nameset.setTypeface(font);
				nameset.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								nameset.setTextColor(Color.YELLOW);
								GUI.setBackground(nameset,namesetimage_push);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								nameset.setTextColor(Color.WHITE);
								GUI.setBackground(nameset,namesetimage);
							}
							return false;
						}
					}
				);
				nameset.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							GUI.showBoxNameSetting();
							Level.playSoundEnt(getPlayerEnt(),"random.click",500,1);
						}
					}
				);
				nameset.setX(Width(-90));
				nameset.setY(Height(186));
				namesetlayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
				namesetlayout.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(nameset,namesetlayout);
				//個数表示
				let amountview=new TextView(ctx);
				let amountlayout=new RelativeLayout.LayoutParams(Width(810),Height(174));
				GUI.setBackground(amountview,amountviewimage);
				amountview.setTextColor(Color.WHITE);
				amountview.setGravity(Gravity.CENTER|Gravity.CENTER);
				amountview.setTypeface(font);
				if(ModPE.getLanguage()=="ja_JP"){
					amountview.setText("個数: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
				}else{
					amountview.setText("Amount: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
				}
				amountview.setX(Width(-90));
				amountview.setY(Height(-70));
				amountlayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
				amountlayout.addRule(RelativeLayout.ALIGN_BOTTOM,1);
				mainlayout.addView(amountview,amountlayout);
				//セットブロック
				let setblock=new ImageButton(ctx);
				let setblocklayout=new RelativeLayout.LayoutParams(Width(180),Height(180));
				let loadinfo=System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()));
				let loadid=loadinfo[0];
				let loaddata=loadinfo[1];
				let backimage;
				if(isItem(loadid)){
					GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
					setblock.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+loadid+"_"+loaddata+".png")),Width(180),Height(180),true));
				}else if(isBlock(loadid)){
					GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+loadid+"_"+loaddata+".png")),Width(180),Height(180),true)));
				}else if(isFood(loadid)){
					GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+loadid+".png")),Width(180),Height(180),true)));
				}else{
					GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
				}
				setblock.setX(Width(-410));
				setblock.setY(Height(380));
				setblocklayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
				setblocklayout.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(setblock,setblocklayout);
				//ONE
				let one=new Button(ctx);
				let oneparams=new RelativeLayout.LayoutParams(Width(180),Height(150));
				one.setText("ONE");
				one.setTextSize(12);
				one.setTextColor(Color.WHITE);
				one.setTypeface(font);
				GUI.setBackground(one,controlbuttonimage);
				one.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							Level.playSoundEnt(getPlayerEnt(),"random.click",500,1);
							let info=System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()));
							let setedid=Number(info[0]);
							let seteddata=Number(info[1]);
							let fileamo=Number(info[2]);
							if(fileamo>0){
								let adds=System.addItemInventory(setedid,1,seteddata);
								if(adds==0){
									if(fileamo-1==0){
										System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),0,0,0);
										GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
										setblock.setImageBitmap(null);
									}else{
										System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,fileamo-1);
									}
									if(ModPE.getLanguage()=="ja_JP"){
										amountview.setText("個数: "+(fileamo-1));
									}else{
										amountview.setText("Amount: "+(fileamo-1));
									}
								}
								for(let i=0;i<items.length;i++){
									inv.removeView(items[i]);
								}
								items.length=0;
								setInventory();
							}
						}
					}
				);
				one.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								one.setTextColor(Color.YELLOW);
								GUI.setBackground(one,controlbuttonimage_push);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								one.setTextColor(Color.WHITE);
								GUI.setBackground(one,controlbuttonimage);
							}
							return false;
						}
					}
				);
				one.setX(Width(-700));
				one.setY(Height(-300));
				oneparams.addRule(RelativeLayout.ALIGN_BOTTOM,1);
				oneparams.addRule(RelativeLayout.ALIGN_RIGHT,1);
				mainlayout.addView(one,oneparams);
				//STACK
				let stack=new Button(ctx);
				let stackparams=new RelativeLayout.LayoutParams(Width(180),Height(150));
				stack.setText("STACK");
				stack.setTextSize(12);
				stack.setTextColor(Color.WHITE);
				stack.setTypeface(font);
				GUI.setBackground(stack,controlbuttonimage);
				stack.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							Level.playSoundEnt(getPlayerEnt(),"random.click",500,1);
							let info=System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()));
							let setedid=Number(info[0]);
							let seteddata=Number(info[1]);
							let fileamo=Number(info[2]);
							if(fileamo>=64){
								let adds=System.addItemInventory(setedid,64,seteddata);
								if(adds==0){
									if(fileamo-64==0){
										System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),0,0,0);
										GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
										setblock.setImageBitmap(null);
									}else{
										System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,fileamo-64);
									}
									if(ModPE.getLanguage()=="ja_JP"){
										amountview.setText("個数: "+(fileamo-64));
									}else{
										amountview.setText("Amount: "+(fileamo-64));
									}
								}else{
									System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,(fileamo-64)+adds);
									if(ModPE.getLanguage()=="ja_JP"){
										amountview.setText("個数: "+((fileamo-64)+adds));
									}else{
										amountview.setText("Amount: "+((fileamo-64)+adds));
									}
								}
							}else{
								let adds=System.addItemInventory(setedid,fileamo,seteddata);
								if(adds==0){
									System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),0,0,0);
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
									setblock.setImageBitmap(null);
								}else{
									System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,adds);
								}
								if(ModPE.getLanguage()=="ja_JP"){
									amountview.setText("個数: "+adds);
								}else{
									amountview.setText("Amount: "+adds);
								}
							}
							for(let i=0;i<items.length;i++){
								inv.removeView(items[i]);
							}
							items.length=0;
							setInventory();
						}
					}
				);
				stack.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								stack.setTextColor(Color.YELLOW);
								GUI.setBackground(stack,controlbuttonimage_push);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								stack.setTextColor(Color.WHITE);
								GUI.setBackground(stack,controlbuttonimage);
							}
							return false;
						}
					}
				);
				stack.setX(Width(-510));
				stack.setY(Height(-300));
				stackparams.addRule(RelativeLayout.ALIGN_BOTTOM,1);
				stackparams.addRule(RelativeLayout.ALIGN_RIGHT,1);
				mainlayout.addView(stack,stackparams);
				//HALF
				let half=new Button(ctx);
				let halfparams=new RelativeLayout.LayoutParams(Width(180),Height(150));
				half.setText("HALF");
				half.setTextSize(12);
				half.setTextColor(Color.WHITE);
				half.setTypeface(font);
				GUI.setBackground(half,controlbuttonimage);
				half.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							Level.playSoundEnt(getPlayerEnt(),"random.click",500,1);
							let info=System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()));
							let setedid=Number(info[0]);
							let seteddata=Number(info[1]);
							let fileamo=Number(info[2]);
							let addamo=Math.floor(fileamo/2);
							let remain=fileamo%2;
							if(fileamo>=addamo){
								let adds=System.addItemInventory(setedid,addamo,seteddata);
								if(adds==0){
									if(fileamo-addamo==0){
										System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),0,0,0);
										GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
										setblock.setImageBitmap(null);
									}else{
										System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,fileamo-addamo);
									}
									if(ModPE.getLanguage()=="ja_JP"){
										amountview.setText("個数: "+(fileamo-addamo));
									}else{
										amountview.setText("Amount: "+(fileamo-addamo));
									}
								}
							}else{
								let adds=System.addItemInventory(setedid,fileamo,seteddata);
								if(adds==0){
									System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),0,0,0);
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
									setblock.setImageBitmap(null);
								}else{
									System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,adds);
								}
								if(ModPE.getLanguage()=="ja_JP"){
									amountview.setText("個数: "+adds);
								}else{
									amountview.setText("Amount: "+adds);
								}
							}
							for(let i=0;i<items.length;i++){
								inv.removeView(items[i]);
							}
							items.length=0;
							setInventory();
						}
					}
				);
				half.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								half.setTextColor(Color.YELLOW);
								GUI.setBackground(half,controlbuttonimage_push);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								half.setTextColor(Color.WHITE);
								GUI.setBackground(half,controlbuttonimage);
							}
							return false;
						}
					}
				);
				half.setX(Width(-300));
				half.setY(Height(-300));
				halfparams.addRule(RelativeLayout.ALIGN_BOTTOM,1);
				halfparams.addRule(RelativeLayout.ALIGN_RIGHT,1);
				mainlayout.addView(half,halfparams);
				//ALL
				let all=new Button(ctx);
				let allparams=new RelativeLayout.LayoutParams(Width(180),Height(150));
				all.setText("ALL");
				all.setTextSize(12);
				all.setTextColor(Color.WHITE);
				all.setTypeface(font);
				GUI.setBackground(all,controlbuttonimage);
				all.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
						try{
							Level.playSoundEnt(getPlayerEnt(),"random.click",500,1);
							let info=System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()));
							let setedid=Number(info[0]);
							let seteddata=Number(info[1]);
							let fileamo=Number(info[2]);
							let adds=System.addItemInventory(setedid,fileamo,seteddata);
							if(adds==0){
								System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),0,0,0);
								GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
								setblock.setImageBitmap(null);
							}else{
								System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,adds);
							}
							if(ModPE.getLanguage()=="ja_JP"){
								amountview.setText("個数: "+adds);
							}else{
								amountview.setText("Amount: "+adds);
							}
							for(let i=0;i<items.length;i++){
								inv.removeView(items[i]);
							}
							items.length=0;
							setInventory();
							}catch(e){
							saveError(e);
						}
						}
					}
				);
				all.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								all.setTextColor(Color.YELLOW);
								GUI.setBackground(all,controlbuttonimage_push);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								all.setTextColor(Color.WHITE);
								GUI.setBackground(all,controlbuttonimage);
							}
							return false;
						}
					}
				);
				all.setX(Width(-110));
				all.setY(Height(-300));
				allparams.addRule(RelativeLayout.ALIGN_BOTTOM,1);
				allparams.addRule(RelativeLayout.ALIGN_RIGHT,1);
				mainlayout.addView(all,allparams);
				//オールボタン
				let allbutton=new Button(ctx);
				let allbuttonlayout=new RelativeLayout.LayoutParams(Width(180),Height(100));
				allbutton.setText("ALL");
				allbutton.setTextSize(12);
				allbutton.setTextColor(Color.WHITE);
				allbutton.setTypeface(font);
				GUI.setBackground(allbutton,allbuttonimage);
				allbutton.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								GUI.setBackground(allbutton,allbuttonimage_push);
								allbutton.setTextColor(Color.YELLOW);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								GUI.setBackground(allbutton,allbuttonimage);
								allbutton.setTextColor(Color.WHITE)
							}
							return false;
						}
					}
				);
				allbutton.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							let setedid=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[0]);
							let seteddata=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[1]);
							let fileamo=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
							if((allitem==setedid&&allitemdata==seteddata)||setedid==0){
								for(let i=9;i<=44;i++){
									if(Player.getInventorySlot(i)==allitem&&Player.getInventorySlotData(i)==allitemdata){
										fileamo+=Player.getInventorySlotCount(i);
										Player.setInventorySlot(i,0,0,0);
									}
								}
								System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),allitem,allitemdata,String(fileamo));
								if(isItem(allitem)){
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
									setblock.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+allitem+"_"+allitemdata+".png")),Width(180),Height(180),true));
								}else if(isBlock(allitem)){
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+allitem+"_"+allitemdata+".png")),Width(180),Height(180),true)));
								}else if(isFood(allitem)){
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+allitem+".png")),Width(180),Height(180),true)));
								}
								if(ModPE.getLanguage()=="ja_JP"){
									amountview.setText("個数: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
								}else{
									amountview.setText("Amount: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
								}
								for(let i=0;i<items.length;i++){
									inv.removeView(items[i]);
								}
								items.length=0;
								setInventory();
							}
						}
					}
				);
				allbutton.setX(Width(10));
				allbutton.setY(Height(15));
				allbuttonlayout.addRule(RelativeLayout.ALIGN_LEFT,1);
				allbuttonlayout.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(allbutton,allbuttonlayout);
				//インベントリ
				let scroll=new ScrollView(ctx);
				let scrolllayout=new RelativeLayout.LayoutParams((Width(130)*6)+Width(120),Height(900));
				scroll.setVerticalScrollBarEnabled(false);
				scroll.setOverScrollMode(android.view.View.OVER_SCROLL_NEVER);
				scroll.setX(Width(30));
				scroll.setY(Height(-18));
				scrolllayout.addRule(RelativeLayout.ALIGN_LEFT,1);
				scrolllayout.addRule(RelativeLayout.ALIGN_BOTTOM,1);
				mainlayout.addView(scroll,scrolllayout);
				let inv=new GridLayout(ctx);
				inv.setColumnCount(6);
				inv.setRowCount(8);
				inv.setBackgroundColor(Color.DKGRAY);
				inv.setPadding(Width(60),Height(60),Width(60),Height(60));
				scroll.addView(inv);
				let invparms=new android.view.ViewGroup.LayoutParams(Width(130),Height(130));
				function addInventory(slot){
					var relative=new RelativeLayout(ctx);
					let itemlayout=new RelativeLayout.LayoutParams(Width(130),Height(130));
					let countlayout=new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);
					let item=new ImageButton(ctx);
					var inventory_slot=Player.getInventorySlot(slot);
					var inventory_slot_data=Player.getInventorySlotData(slot);
					var inventory_slot_count=Player.getInventorySlotCount(slot);
					let enchant=Player.getEnchantments(slot);
					let trueitemimage=false;
					if(isItem(inventory_slot)){
						GUI.setBackground(item,invslotimage);
						try{
							item.setImageBitmap(eval("slot"+inventory_slot+"_"+inventory_slot_data).getBitmap());
							trueitemimage=true;
						}catch(e){}
					}else if(isBlock(inventory_slot)){
						GUI.setBackground(item,eval("slot"+inventory_slot+"_"+inventory_slot_data));
						trueitemimage=true;
					}else if(isFood(inventory_slot)){
						GUI.setBackground(item,eval("slot"+inventory_slot+"_"));
						trueitemimage=true;
					}else{
						GUI.setBackground(item,invslotimage);
					}
					item.setId(1);
					itemlayout.addRule(RelativeLayout.CENTER_IN_PARENT);
					relative.addView(item,itemlayout);
					if(trueitemimage){
						let itemcount=new TextView(ctx);
						if(inventory_slot_count!=1){
							itemcount.setText(String(inventory_slot_count));
						}
						itemcount.setTextColor(Color.WHITE);
						itemcount.setTextSize(12);
						itemcount.setTypeface(font);
						itemcount.setX(Width(-12));
						itemcount.setY(Height(-3));
						countlayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
						countlayout.addRule(RelativeLayout.ALIGN_BOTTOM,1);
						relative.addView(itemcount,countlayout);
						
						if(enchant[0]==undefined){
						item.setOnClickListener(
							new OnClickListener(){
								onClick:function(){
									allitem=Player.getInventorySlot(slot);
									allitemdata=Player.getInventorySlotData(slot);
									let setedid=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[0]);
									let seteddata=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[1]);
									let fileamo=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
									if((Player.getInventorySlot(slot)==setedid&&Player.getInventorySlotData(slot)==seteddata)||setedid==0){
										if(Player.getItemCustomName(Player.getSelectedSlotId())==null){
											GUI.showBoxNameSetting();
										}else{
										fileamo+=1;
										System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),Player.getInventorySlot(slot),Player.getInventorySlotData(slot),String(fileamo));
										if(isItem(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
											setblock.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true));
										}else if(isBlock(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true)));
										}else if(isFood(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+inventory_slot+".png")),Width(180),Height(180),true)));											}
										if(ModPE.getLanguage()=="ja_JP"){
											amountview.setText("個数: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
										}else{
											amountview.setText("Amount: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
										}
										if(Player.getInventorySlotCount(slot)==1){
											Player.setInventorySlot(slot,0,0,0);
											GUI.setBackground(item,slotimage);
											item.setImageBitmap(null);
											relative.removeView(itemcount);
										}else{
											Player.setInventorySlot(slot,Player.getInventorySlot(slot),Player.getInventorySlotCount(slot)-1,Player.getInventorySlotData(slot));
											itemcount.setText(String(Player.getInventorySlotCount(slot)));
										}
										}
									}
								}
							}
						);
						item.setOnLongClickListener(
							new OnLongClickListener(){
								onLongClick:function(){
									let setedid=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[0]);
									let seteddata=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[1]);
									let fileamo=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
									if((Player.getInventorySlot(slot)==setedid&&Player.getInventorySlotData(slot)==seteddata)||setedid==0){
										if(Player.getItemCustomName(Player.getSelectedSlotId())==null){
											GUI.showBoxNameSetting();
										}else{
										fileamo+=Player.getInventorySlotCount(slot);
										System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),Player.getInventorySlot(slot),Player.getInventorySlotData(slot),String(fileamo));
										if(isItem(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
											setblock.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true));
										}else if(isBlock(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true)));
										}else if(isFood(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+inventory_slot+".png")),Width(180),Height(180),true)));											}
										if(ModPE.getLanguage()=="ja_JP"){
											amountview.setText("個数: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
										}else{
											amountview.setText("Amount: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
										}
										Player.setInventorySlot(slot,0,0,0);
										GUI.setBackground(item,slotimage);
										item.setImageBitmap(null);
										relative.removeView(itemcount);
										}
									}
									return true;
								}
							}
						);
						}
					}else{
						GUI.setBackground(item,slotimage);
					}
					items.push(relative);
					inv.addView(relative,invparms);
				}
				function setInventory(){
					addInventory(9);
					addInventory(10);
					addInventory(11);
					addInventory(12);
					addInventory(13);
					addInventory(14);
					addInventory(15);
					addInventory(16);
					addInventory(17);
					addInventory(18);
					addInventory(19);
					addInventory(20);
					addInventory(21);
					addInventory(22);
					addInventory(23);
					addInventory(24);
					addInventory(25);
					addInventory(26);
					addInventory(27);
					addInventory(28);
					addInventory(29);
					addInventory(30);
					addInventory(31);
					addInventory(32);
					addInventory(33);
					addInventory(34);
					addInventory(35);
					addInventory(36);
					addInventory(37);
					addInventory(38);
					addInventory(39);
					addInventory(40);
					addInventory(41);
					addInventory(42);
					addInventory(43);
					addInventory(44);
				}
				setInventory();
				//セットブロック処理
				setblock.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							if(Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2])!=0){
								let setedid=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[0]);
								let seteddata=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[1]);
								let fileamo=Number(System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
								let dialog=new Dialog(ctx);
								let takeout=new LinearLayout(ctx);
								takeout.setOrientation(LinearLayout.VERTICAL);
								let edit=new EditText(ctx);
								edit.setHint("Amount");
								edit.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
								takeout.addView(edit);
								let okbutton=new Button(ctx);
								okbutton.setText("OK");
								okbutton.setTextSize(20);
								okbutton.setOnClickListener(
									new OnClickListener(){
										onClick:function(){
											let amo=Number(edit.getText());
											if(amo<fileamo){
												let adds=System.addItemInventory(setedid,amo,seteddata);
												if(adds==0){
													fileamo-=amo;
													System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(setedid),String(seteddata),String(fileamo));
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+fileamo);
													}else{
														amountview.setText("Amount: "+fileamo);
													}
												}else{
													fileamo-=(amo-adds);
													System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(setedid),String(seteddata),String(fileamo));
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+fileamo);
													}else{
														amountview.setText("Amount: "+fileamo);
													}
												}
											}else{
												let adds=System.addItemInventory(setedid,fileamo,seteddata);
												if(adds>0){
													System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,adds);
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+(fileamo-(fileamo-adds)));
													}else{
														amountview.setText("Amount: "+(fileamo-(fileamo-adds)));
													}
												}else{
													System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),0,0,0);
													GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
													setblock.setImageBitmap(null);
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: 0");
													}else{
														amountview.setText("Amount: 0");
													}
												}
											}
											dialog.dismiss();
											for(let i=0;i<items.length;i++){
												inv.removeView(items[i]);
											}
											items.length=0;
											setInventory();
										}
									}
								);
								takeout.addView(okbutton);
								if(ModPE.getLanguage()=="ja_JP"){
									dialog.setTitle("取り出す");
								}else{
									dialog.setTitle("Take out");
								}
								dialog.setContentView(takeout);
								dialog.show();
							}
						}
					}
				);
				//位置ズレ防止
				let posikeep=new TextView(ctx);
				//ポップアップウィンドウ
				let posikeeps=new PopupWindow(posikeep,LinearLayout.LayoutParams.WRAP_CONTENT,LinearLayout.LayoutParams.WRAP_CONTENT);
				posikeeps.showAtLocation(ctx.getWindow().getDecorView(),Gravity.CENTER|Gravity.CENTER,0,0);
				let gui=new PopupWindow(mainlayout,point.x,point.y);
				gui.showAtLocation(ctx.getWindow().getDecorView(),Gravity.CENTER|Gravity.TOP,0,0);
				setting_screen.push(posikeeps,gui);
			});
		},
		addSettingScreen2:function(){
			GUI.uiThread(function(){
				flag=false;
				let display=ctx.getWindowManager().getDefaultDisplay();
				let point=new android.graphics.Point();
				display.getSize(point);
				//レイアウト
				let mainlayout=new RelativeLayout(ctx);
				//背景
				let backs=new LinearLayout(ctx);
				let backlayout=new RelativeLayout.LayoutParams(point.x,point.y);
				backs.setOrientation(LinearLayout.VERTICAL);
				backs.setId(1);
				backlayout.addRule(RelativeLayout.CENTER_IN_PARENT);
				mainlayout.addView(backs,backlayout);
				if(Build.VERSION.SDK_INT>=21){
					//ヘッダー
					let header=new Toolbar(ctx);
					GUI.setBackground(header,topbarimage);
					backs.addView(header);
					//タイトル
					let title=new TextView(ctx);
					let titlelayout=new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);
					if(Player.getItemCustomName(Player.getSelectedSlotId())!=null){
						title.setText(Player.getItemCustomName(Player.getSelectedSlotId()));
					}else{
						title.setText(Item.getName(Player.getInventorySlot(Player.getSelectedSlotId()),Player.getInventorySlotData(Player.getSelectedSlotId()),false));
					}
					title.setTextSize(15);
					title.setTextColor(Color.WHITE);
					title.setTypeface(font);
					title.setY(Height(34));
					titlelayout.addRule(RelativeLayout.CENTER_HORIZONTAL);
					titlelayout.addRule(RelativeLayout.ALIGN_PARENT_TOP);
					mainlayout.addView(title,titlelayout);
					//メイン
					let main=new ImageView(ctx);
					GUI.setBackground(main,backgroundimage);
					backs.addView(main);
				}else if(Build.VERSION.SDK_INT<21){
					//ヘッダー
					let header=new ImageView(ctx);
					let headerparams=new android.view.ViewGroup.LayoutParams(Width(4000),BarHeight());
					GUI.setBackground(header,topbarimage);
					backs.addView(header,headerparams);
					//タイトル
					let title=new TextView(ctx);
					let titlelayout=new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);
					if(Player.getItemCustomName(Player.getSelectedSlotId())!=null){
						title.setText(Player.getItemCustomName(Player.getSelectedSlotId()));
					}else{
						title.setText(Item.getName(Player.getInventorySlot(Player.getSelectedSlotId()),Player.getInventorySlotData(Player.getSelectedSlotId()),false));
					}
					title.setTextSize(15);
					title.setTextColor(Color.WHITE);
					title.setTypeface(font);
					title.setY(Height(34));
					titlelayout.addRule(RelativeLayout.CENTER_HORIZONTAL);
					titlelayout.addRule(RelativeLayout.ALIGN_PARENT_TOP);
					mainlayout.addView(title,titlelayout);
					//メイン
					let main=new ImageView(ctx);
					GUI.setBackground(main,backgroundimage);
					backs.addView(main);
				}
				//バックボタン
				let backbutton=new ImageButton(ctx);
				let backbuttonlayout=new RelativeLayout.LayoutParams(Width(100),Height(100));
				GUI.setBackground(backbutton,backbuttonimage);
				backbutton.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								GUI.setBackground(backbutton,backbuttonimage_push);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								GUI.setBackground(backbutton,backbuttonimage);
							}
							return false;
						}
					}
				);
				backbutton.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							Level.playSoundEnt(getPlayerEnt(),"random.click",500,1);
							GUI.backSettingScreen();
						}
					}
				);
				backbutton.setY(Height(10));
				backbuttonlayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
				backbuttonlayout.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(backbutton,backbuttonlayout);
				//名前変更
				let nameset=new Button(ctx);
				let namesetlayout=new RelativeLayout.LayoutParams(Width(810),Height(146));
				GUI.setBackground(nameset,namesetimage);
				nameset.setTextColor(Color.WHITE);
				if(ModPE.getLanguage()=="ja_JP"){
					nameset.setText("名前を変える");
				}else{
					nameset.setText("Change name");
				}
				nameset.setTypeface(font);
				nameset.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								nameset.setTextColor(Color.YELLOW);
								GUI.setBackground(nameset,namesetimage_push);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								nameset.setTextColor(Color.WHITE);
								GUI.setBackground(nameset,namesetimage);
							}
							return false;
						}
					}
				);
				nameset.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							GUI.showBoxNameSetting();
							Level.playSoundEnt(getPlayerEnt(),"random.click",500,1);
						}
					}
				);
				nameset.setX(Width(-90));
				nameset.setY(Height(186));
				namesetlayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
				namesetlayout.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(nameset,namesetlayout);
				//個数表示
				let amountview=new TextView(ctx);
				let amountlayout=new RelativeLayout.LayoutParams(Width(810),Height(174));
				GUI.setBackground(amountview,amountviewimage);
				amountview.setTextColor(Color.WHITE);
				amountview.setGravity(Gravity.CENTER|Gravity.CENTER);
				amountview.setTypeface(font);
				if(ModPE.getLanguage()=="ja_JP"){
					amountview.setText("個数: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
				}else{
					amountview.setText("Amount: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
				}
				amountview.setX(Width(-90));
				amountview.setY(Height(-70));
				amountlayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
				amountlayout.addRule(RelativeLayout.ALIGN_BOTTOM,1);
				mainlayout.addView(amountview,amountlayout);
				//セットブロック
				let setblock=new ImageButton(ctx);
				let setblocklayout=new RelativeLayout.LayoutParams(Width(180),Height(180));
				let loadinfo=System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()));
				let loadid=loadinfo[0];
				let loaddata=loadinfo[1];
				if(isItem(loadid)){
					GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
					setblock.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+loadid+"_"+loaddata+".png")),Width(180),Height(180),true));
				}else if(isBlock(loadid)){
					GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+loadid+"_"+loaddata+".png")),Width(180),Height(180),true)));
				}else if(isFood(loadid)){
					GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+loadid+".png")),Width(180),Height(180),true)));
				}else{
					GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
				}
				setblock.setX(Width(-410));
				setblock.setY(Height(380));
				setblocklayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
				setblocklayout.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(setblock,setblocklayout);
				//セットブロック2
				let setblock2=new ImageButton(ctx);
				let setblocklayout2=new RelativeLayout.LayoutParams(Width(180),Height(180));
				let loadid2=loadinfo[3];
				let loaddata2=loadinfo[4];
				if(isItem(loadid2)){
					GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
					setblock2.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+loadid2+"_"+loaddata2+".png")),Width(180),Height(180),true));
				}else if(isBlock(loadid2)){
					GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+loadid2+"_"+loaddata2+".png")),Width(180),Height(180),true)));
				}else if(isFood(loadid2)){
					GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+loadid2+".png")),Width(180),Height(180),true)));
				}else{
					GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
				}
				setblock2.setX(Width(-410));
				setblock2.setY(Height(580));
				setblocklayout2.addRule(RelativeLayout.ALIGN_RIGHT,1);
				setblocklayout2.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(setblock2,setblocklayout2);
				//オールボタン
				let allbutton=new Button(ctx);
				let allbuttonlayout=new RelativeLayout.LayoutParams(Width(180),Height(100));
				allbutton.setText("ALL");
				allbutton.setTextSize(12);
				allbutton.setTextColor(Color.WHITE);
				allbutton.setTypeface(font);
				GUI.setBackground(allbutton,allbuttonimage);
				allbutton.setOnTouchListener(
					new OnTouchListener(){
						onTouch:function(view,event){
							if(event.getAction()==MotionEvent.ACTION_DOWN){
								GUI.setBackground(allbutton,allbuttonimage_push);
								allbutton.setTextColor(Color.YELLOW);
							}
							if(event.getAction()==MotionEvent.ACTION_UP){
								GUI.setBackground(allbutton,allbuttonimage);
								allbutton.setTextColor(Color.WHITE)
							}
							return false;
						}
					}
				);
				allbutton.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							let setedid=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[0]);
							let seteddata=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[1]);
							let fileamo=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
							let setedid2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3]);
							let seteddata2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[4]);
							let fileamo2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
							if((allitem==setedid&&allitemdata==seteddata)||setedid==0){
								for(let i=9;i<=44;i++){
									if(Player.getInventorySlot(i)==allitem&&Player.getInventorySlotData(i)==allitemdata){
										fileamo+=Player.getInventorySlotCount(i);
										Player.setInventorySlot(i,0,0,0);
									}
								}
								System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),allitem,allitemdata,String(fileamo),String(setedid2),String(seteddata2),String(fileamo2));
								if(isItem(allitem)){
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
									setblock.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+allitem+"_"+allitemdata+".png")),Width(180),Height(180),true));
								}else if(isBlock(allitem)){
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+allitem+"_"+allitemdata+".png")),Width(180),Height(180),true)));
								}else if(isFood(allitem)){
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+allitem+".png")),Width(180),Height(180),true)));
								}
								if(ModPE.getLanguage()=="ja_JP"){
									amountview.setText("個数: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
								}else{
									amountview.setText("Amount: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
								}
								for(let i=0;i<items.length;i++){
									inv.removeView(items[i]);
								}
								items.length=0;
								setInventory();
							}else if((allitem==setedid2&&allitemdata==seteddata2)||setedid2==0){
								for(let i=9;i<=44;i++){
									if(Player.getInventorySlot(i)==allitem&&Player.getInventorySlotData(i)==allitemdata){
										fileamo2+=Player.getInventorySlotCount(i);
										Player.setInventorySlot(i,0,0,0);
									}
								}
								System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),String(setedid),String(seteddata),String(fileamo),allitem,allitemdata,String(fileamo2));
								if(isItem(allitem)){
									GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
									setblock2.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+allitem+"_"+allitemdata+".png")),Width(180),Height(180),true));
								}else if(isBlock(allitem)){
									GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+allitem+"_"+allitemdata+".png")),Width(180),Height(180),true)));
								}else if(isFood(allitem)){
									GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+allitem+".png")),Width(180),Height(180),true)));
								}
								if(ModPE.getLanguage()=="ja_JP"){
									amountview.setText("個数: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
								}else{
									amountview.setText("Amount: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
								}
								for(let i=0;i<items.length;i++){
									inv.removeView(items[i]);
								}
								items.length=0;
								setInventory();
							}
						}
					}
				);
				allbutton.setX(Width(10));
				allbutton.setY(Height(15));
				allbuttonlayout.addRule(RelativeLayout.ALIGN_LEFT,1);
				allbuttonlayout.addRule(RelativeLayout.ALIGN_TOP,1);
				mainlayout.addView(allbutton,allbuttonlayout);
				//インベントリ
				let scroll=new ScrollView(ctx);
				let scrolllayout=new RelativeLayout.LayoutParams((Width(130)*6)+Width(120),Height(900));
				scroll.setVerticalScrollBarEnabled(false);
				scroll.setOverScrollMode(android.view.View.OVER_SCROLL_NEVER);
				scroll.setX(Width(30));
				scroll.setY(Height(-18));
				scrolllayout.addRule(RelativeLayout.ALIGN_LEFT,1);
				scrolllayout.addRule(RelativeLayout.ALIGN_BOTTOM,1);
				mainlayout.addView(scroll,scrolllayout);
				let inv=new GridLayout(ctx);
				inv.setColumnCount(6);
				inv.setRowCount(8);
				inv.setBackgroundColor(Color.DKGRAY);
				inv.setPadding(Width(60),Height(60),Width(60),Height(60));
				scroll.addView(inv);
				let invparms=new android.view.ViewGroup.LayoutParams(Width(130),Height(130));
				function addInventory(slot){
					let relative=new RelativeLayout(ctx);
					let itemlayout=new RelativeLayout.LayoutParams(Width(130),Height(130));
					let countlayout=new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,RelativeLayout.LayoutParams.WRAP_CONTENT);
					let item=new ImageButton(ctx);
					let inventory_slot=Player.getInventorySlot(slot);
					let inventory_slot_data=Player.getInventorySlotData(slot);
					let inventory_slot_count=Player.getInventorySlotCount(slot);
					let enchant=Player.getEnchantments(slot);
					let trueitemimage=false;
					if(isItem(inventory_slot)){
						GUI.setBackground(item,invslotimage);
						try{
							item.setImageBitmap(eval("slot"+inventory_slot+"_"+inventory_slot_data).getBitmap());
							trueitemimage=true;
						}catch(e){}
					}else if(isBlock(inventory_slot)){
						GUI.setBackground(item,eval("slot"+inventory_slot+"_"+inventory_slot_data));
						trueitemimage=true;
					}else if(isFood(inventory_slot)){
						GUI.setBackground(item,eval("slot"+inventory_slot+"_"));
						trueitemimage=true;
					}else{
						GUI.setBackground(item,invslotimage);
					}
					item.setId(1);
					itemlayout.addRule(RelativeLayout.CENTER_IN_PARENT);
					relative.addView(item,itemlayout);
					if(trueitemimage){
						let itemcount=new TextView(ctx);
						if(inventory_slot_count!=1){
							itemcount.setText(String(inventory_slot_count));
						}
						itemcount.setTextColor(Color.WHITE);
						itemcount.setTextSize(12);
						itemcount.setTypeface(font);
						itemcount.setX(Width(-12));
						itemcount.setY(Height(-3));
						countlayout.addRule(RelativeLayout.ALIGN_RIGHT,1);
						countlayout.addRule(RelativeLayout.ALIGN_BOTTOM,1);
						relative.addView(itemcount,countlayout);
						if(enchant[0]==undefined){
						item.setOnClickListener(
							new OnClickListener(){
								onClick:function(){
									allitem=Player.getInventorySlot(slot);
									allitemdata=Player.getInventorySlotData(slot);
									let setedid=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[0]);
									let seteddata=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[1]);
									let fileamo=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
									let setedid2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3]);
									let seteddata2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[4]);
									let fileamo2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
									if((Player.getInventorySlot(slot)==setedid&&Player.getInventorySlotData(slot)==seteddata)||setedid==0){
										fileamo+=1;
										if(Player.getItemCustomName(Player.getSelectedSlotId())==null){
											GUI.showBoxNameSetting();
										}else{
										System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),Player.getInventorySlot(slot),Player.getInventorySlotData(slot),String(fileamo),String(setedid2),String(seteddata2),String(fileamo2));
										if(isItem(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
											setblock.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true));
										}else if(isBlock(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true)));
										}else if(isFood(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+inventory_slot+".png")),Width(180),Height(180),true)));											}
										if(ModPE.getLanguage()=="ja_JP"){
											amountview.setText("個数: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
										}else{
											amountview.setText("Amount: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
										}
										if(Player.getInventorySlotCount(slot)==1){
											Player.setInventorySlot(slot,0,0,0);
											GUI.setBackground(item,slotimage);
											item.setImageBitmap(null);
											relative.removeView(itemcount);
										}else{
											Player.setInventorySlot(slot,Player.getInventorySlot(slot),Player.getInventorySlotCount(slot)-1,Player.getInventorySlotData(slot));
											itemcount.setText(String(Player.getInventorySlotCount(slot)));
										}
										}
									}else if((Player.getInventorySlot(slot)==setedid2&&Player.getInventorySlotData(slot)==seteddata2)||setedid2==0){
										fileamo2+=1;
										if(Player.getItemCustomName(Player.getSelectedSlotId())==null){
											GUI.showBoxNameSetting();
										}else{
										System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),String(setedid),String(seteddata),String(fileamo),Player.getInventorySlot(slot),Player.getInventorySlotData(slot),String(fileamo2));
										if(isItem(inventory_slot)){
											GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
											setblock2.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true));
										}else if(isBlock(inventory_slot)){
											GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true)));
										}else if(isFood(inventory_slot)){
											GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+inventory_slot+".png")),Width(180),Height(180),true)));											}
										if(ModPE.getLanguage()=="ja_JP"){
											amountview.setText("個数: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
										}else{
											amountview.setText("Amount: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
										}
										if(Player.getInventorySlotCount(slot)==1){
											Player.setInventorySlot(slot,0,0,0);
											GUI.setBackground(item,slotimage);
											item.setImageBitmap(null);
											relative.removeView(itemcount);
										}else{
											Player.setInventorySlot(slot,Player.getInventorySlot(slot),Player.getInventorySlotCount(slot)-1,Player.getInventorySlotData(slot));
											itemcount.setText(String(Player.getInventorySlotCount(slot)));
										}
										}
									}
								}
							}
						);
						item.setOnLongClickListener(
							new OnLongClickListener(){
								onLongClick:function(){
									let setedid=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[0]);
									let seteddata=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[1]);
									let fileamo=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
									let setedid2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3]);
									let seteddata2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[4]);
									let fileamo2=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
									if((Player.getInventorySlot(slot)==setedid&&Player.getInventorySlotData(slot)==seteddata)||setedid==0){
										fileamo+=Player.getInventorySlotCount(slot);
										if(Player.getItemCustomName(Player.getSelectedSlotId())==null){
											GUI.showBoxNameSetting();
										}else{
										System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),Player.getInventorySlot(slot),Player.getInventorySlotData(slot),String(fileamo),String(setedid2),String(seteddata2),String(fileamo2));
										if(isItem(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
											setblock.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true));
										}else if(isBlock(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true)));
										}else if(isFood(inventory_slot)){
											GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+inventory_slot+".png")),Width(180),Height(180),true)));											}
										if(ModPE.getLanguage()=="ja_JP"){
											amountview.setText("個数: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
										}else{
											amountview.setText("Amount: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
										}
										Player.setInventorySlot(slot,0,0,0);
										GUI.setBackground(item,slotimage);
										item.setImageBitmap(null);
										relative.removeView(itemcount);
										}
									}else if((Player.getInventorySlot(slot)==setedid2&&Player.getInventorySlotData(slot)==seteddata2)||setedid2==0){
										fileamo2+=Player.getInventorySlotCount(slot);
										if(Player.getItemCustomName(Player.getSelectedSlotId())==null){
											GUI.showBoxNameSetting();
										}else{
										System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),String(setedid),String(seteddata),String(fileamo),Player.getInventorySlot(slot),Player.getInventorySlotData(slot),String(fileamo2));
										if(isItem(inventory_slot)){
											GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
											setblock2.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/item_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true));
										}else if(isBlock(inventory_slot)){
											GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/block_"+inventory_slot+"_"+inventory_slot_data+".png")),Width(180),Height(180),true)));
										}else if(isFood(inventory_slot)){
											GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/food_"+inventory_slot+".png")),Width(180),Height(180),true)));											}
										if(ModPE.getLanguage()=="ja_JP"){
											amountview.setText("個数: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
										}else{
											amountview.setText("Amount: "+System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
										}
										Player.setInventorySlot(slot,0,0,0);
										GUI.setBackground(item,slotimage);
										item.setImageBitmap(null);
										relative.removeView(itemcount);
										}
									}
									return true;
								}
							}
						);
						}
					}else{
						GUI.setBackground(item,slotimage);
					}
					items.push(relative);
					inv.addView(relative,invparms);
				}
				function setInventory(){
					addInventory(9);
					addInventory(10);
					addInventory(11);
					addInventory(12);
					addInventory(13);
					addInventory(14);
					addInventory(15);
					addInventory(16);
					addInventory(17);
					addInventory(18);
					addInventory(19);
					addInventory(20);
					addInventory(21);
					addInventory(22);
					addInventory(23);
					addInventory(24);
					addInventory(25);
					addInventory(26);
					addInventory(27);
					addInventory(28);
					addInventory(29);
					addInventory(30);
					addInventory(31);
					addInventory(32);
					addInventory(33);
					addInventory(34);
					addInventory(35);
					addInventory(36);
					addInventory(37);
					addInventory(38);
					addInventory(39);
					addInventory(40);
					addInventory(41);
					addInventory(42);
					addInventory(43);
					addInventory(44);
				}
				setInventory();
				//セットブロック処理
				setblock.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							if(Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2])!=0){
								let setedid=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[0]);
								let seteddata=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[1]);
								let fileamo=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]);
								let dialog=new Dialog(ctx);
								let takeout=new LinearLayout(ctx);
								takeout.setOrientation(LinearLayout.VERTICAL);
								let edit=new EditText(ctx);
								edit.setHint("Amount");
								edit.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
								takeout.addView(edit);
								let okbutton=new Button(ctx);
								okbutton.setText("OK");
								okbutton.setTextSize(20);
								okbutton.setOnClickListener(
									new OnClickListener(){
										onClick:function(){
											let amo=Number(edit.getText());
											if(amo<fileamo){
												let adds=System.addItemInventory(setedid,amo,seteddata);
												if(adds==0){
													fileamo-=amo;
													System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),String(setedid),String(seteddata),String(fileamo),System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[4],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+fileamo+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}else{
														amountview.setText("Amount: "+fileamo+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}
												}else{
													fileamo-=(amo-adds);
													System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),String(setedid),String(seteddata),String(fileamo),System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[4],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+fileamo+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}else{
														amountview.setText("Amount: "+fileamo+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}
												}
											}else{
												let adds=System.addItemInventory(setedid,fileamo,seteddata);
												if(adds>0){
													System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),setedid,seteddata,adds,System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[4],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+(fileamo-(fileamo-adds))+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}else{
														amountview.setText("Amount: "+(fileamo-(fileamo-adds))+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}
												}else{
													System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),0,0,0,System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[4],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													GUI.setBackground(setblock,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
													setblock.setImageBitmap(null);
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: 0"+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}else{
														amountview.setText("Amount: 0"+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}
												}
											}
											dialog.dismiss();
											for(let i=0;i<items.length;i++){
												inv.removeView(items[i]);
											}
											items.length=0;
											setInventory();
										}
									}
								);
								takeout.addView(okbutton);
								if(ModPE.getLanguage()=="ja_JP"){
									dialog.setTitle("取り出す");
								}else{
									dialog.setTitle("Take out");
								}
								dialog.setContentView(takeout);
								dialog.show();
							}
						}
					}
				);
				//セットブロック2処理
				setblock2.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							if(Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3])!=0){
								let setedid=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[3]);
								let seteddata=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[4]);
								let fileamo=Number(System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
								let dialog=new Dialog(ctx);
								let takeout=new LinearLayout(ctx);
								takeout.setOrientation(LinearLayout.VERTICAL);
								let edit=new EditText(ctx);
								edit.setHint("Amount");
								edit.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
								takeout.addView(edit);
								let okbutton=new Button(ctx);
								okbutton.setText("OK");
								okbutton.setTextSize(20);
								okbutton.setOnClickListener(
									new OnClickListener(){
										onClick:function(){
											let amo=Number(edit.getText());
											if(amo<fileamo){
												let adds=System.addItemInventory(setedid,amo,seteddata);
												if(adds==0){
													fileamo-=amo;
													System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[0],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[1],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2],String(setedid),String(seteddata),String(fileamo));
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+fileamo);
													}else{
														amountview.setText("Amount: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+fileamo);
													}
												}else{
													fileamo-=(amo-adds);
													System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[0],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[1],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2],String(setedid),String(seteddata),String(fileamo));
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+fileamo);
													}else{
														amountview.setText("Amount: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / "+fileamo);
													}
												}
											}else{
												let adds=System.addItemInventory(setedid,fileamo,seteddata);
												if(adds>0){
													System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[0],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[1],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2],String(setedid),String(seteddata),String(fileamo));
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+(fileamo-(fileamo-adds))+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}else{
														amountview.setText("Amount: "+(fileamo-(fileamo-adds))+" / "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[5]);
													}
												}else{
													System.saveBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()),System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[0],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[1],System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2],0,0,0);
													GUI.setBackground(setblock2,android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/inventory.png")),Width(180),Height(180),true)));
													setblock2.setImageBitmap(null);
													if(ModPE.getLanguage()=="ja_JP"){
														amountview.setText("個数: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / 0");
													}else{
														amountview.setText("Amount: "+System.loadBoxInfo2(Player.getItemCustomName(Player.getSelectedSlotId()))[2]+" / 0");
													}
												}
											}
											dialog.dismiss();
											for(let i=0;i<items.length;i++){
												inv.removeView(items[i]);
											}
											items.length=0;
											setInventory();
										}
									}
								);
								takeout.addView(okbutton);
								if(ModPE.getLanguage()=="ja_JP"){
									dialog.setTitle("取り出す");
								}else{
									dialog.setTitle("Take out");
								}
								dialog.setContentView(takeout);
								dialog.show();
							}
						}
					}
				);
				//位置ズレ防止
				let posikeep=new TextView(ctx);
				//ポップアップウィンドウ
				let posikeeps=new PopupWindow(posikeep,LinearLayout.LayoutParams.WRAP_CONTENT,LinearLayout.LayoutParams.WRAP_CONTENT);
				posikeeps.showAtLocation(ctx.getWindow().getDecorView(),Gravity.CENTER|Gravity.CENTER,0,0);
				let gui=new PopupWindow(mainlayout,point.x,point.y);
				gui.showAtLocation(ctx.getWindow().getDecorView(),Gravity.CENTER|Gravity.TOP,0,0);
				setting_screen.push(posikeeps,gui);
			});
		},
		backSettingScreen:function(){
			GUI.uiThread(function(){
				if(viewscreen){
					setting_screen[0].dismiss();
					setting_screen[1].dismiss();
					items.length=0;
					setting_screen.length=0;
					viewscreen=false;
					if(autocollection) flag=true;
				}
			});
		},
		showBoxNameSetting:function(){
			let File=java.io.File;
			let FileReader=java.io.FileReader;
			let BufferedReader=java.io.BufferedReader;
			let FileOutputStream=java.io.FileOutputStream;
			let OutputStreamWriter=java.io.OutputStreamWriter;
			GUI.uiThread(function(){
				let dialog=new Dialog(ctx);
				let scroll=new ScrollView(ctx);
				let layout=new LinearLayout(ctx);
				layout.setOrientation(LinearLayout.VERTICAL);
				let edit=new EditText(ctx);
				edit.setHint("Item name");
				let button=new Button(ctx);
				button.setText("OK");
				button.setTextSize(20);
				button.setOnClickListener(
					new OnClickListener(){
						onClick:function(){
							if(Player.getItemCustomName(Player.getSelectedSlotId())==null&&edit.getText()!=""){
								let path=new File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox/"+edit.getText());
								if(path.exists()){
									let error=new Dialog(ctx);
									let errormessage=new TextView(ctx);
									errormessage.setTextSize(15);
									errormessage.setTextColor(Color.BLACK);
									errormessage.setBackgroundColor(Color.WHITE);
									if(ModPE.getLanguage()=="ja_JP"){
										error.setTitle("エラー");
										errormessage.setText("その名前は既に使用されているため、使用することができません。");
									}else{
										error.setTitle("Error");
										errormessage.setText("This name is already used.");
									}
									error.setContentView(errormessage);
									error.show();
								}else{
									path.createNewFile();
									Player.setItemCustomName(Player.getSelectedSlotId(),edit.getText());
								}
							}else if(edit.getText()!=""){
								let path=new File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox");
								let file=new File(path,Player.getItemCustomName(Player.getSelectedSlotId()));
								let read=new FileReader(file);
								let reader=new BufferedReader(read);
								let data="";
								for(let text=reader.readLine();text!=null;text=reader.readLine()){
									data+=text+"\n";
								}
								reader.close();
								let newfile=new File(path,edit.getText());
								newfile.createNewFile();
								let stream=new FileOutputStream(newfile);
								let writer=new OutputStreamWriter(stream);
								writer.write(data);
								writer.close();
								file.delete();
								Player.setItemCustomName(Player.getSelectedSlotId(),edit.getText());
								boxdatasub={};
								boxdatasub2={};
								System.loadBoxFileInfo();
								System.loadBoxFileInfo2();
							}
							dialog.dismiss();
						}
					}
				);
				layout.addView(edit);
				layout.addView(button);
				scroll.addView(layout);
				dialog.setContentView(scroll);
				if(Player.getItemCustomName(Player.getSelectedSlotId())!=null){
					dialog.setTitle(Player.getItemCustomName(Player.getSelectedSlotId()));
				}else{
					dialog.setTitle(Item.getName(Player.getInventorySlot(Player.getSelectedSlotId()),Player.getInventorySlotData(Player.getSelectedSlotId()),false));
				}
				dialog.show();
			});
		},
		convertDpIntoPixel:function(dp){
			let metrics=ctx.getResources().getDisplayMetrics();
			let math=Number(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,dp,metrics));
			return math;
		},
		createGuiImages:function(image,width,height){
			let bitmap=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/"+image)),width,height,true));
			return bitmap;
		},
		createItemImages:function(image){
			let bitmap=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/item/"+image+".png")),Width(145),Height(145),true));
			return bitmap;
		},
		createBlockImages:function(image){
			let bitmap=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/block/"+image+".png")),Width(145),Height(145),true));
			return bitmap;
		},
		createFoodImages:function(image){
			let bitmap=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/food/"+image+".png")),Width(145),Height(145),true));
			return bitmap;
		},
		setBackground:function(view,drawable){
			if(Build.VERSION.SDK_INT<15){
				view.setBackground(drawable);
			}else{
				view.setBackgroundDrawable(drawable);
			}
		},
		showBoxDataList:function(){
			GUI.uiThread(function(){
				let dialog=new Dialog(ctx);
				let layout=new LinearLayout(ctx);
				let scroll=new ScrollView(ctx);
				layout.setOrientation(LinearLayout.VERTICAL);
				scroll.addView(layout);
				dialog.setTitle("StorageBox data list");
				let path=new java.io.File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox");
				let files=path.listFiles();
				let list=new ArrayList();
				for(let i=0;i<files.length;i++){
					list.add(files[i].getName());
				}
				Collections.sort(list);
				for(let i=0;i<list.size();i++){
					let button=new Button(ctx);
					button.setText(list.get(i));
					button.setOnClickListener(
						new OnClickListener(){
							onClick:function(){
							try{
								GUI.showDeleteBoxDataDialog(button.getText());
								}catch(e){
								saveError(e);
								
								}
							}
						}
					);
					layout.addView(button);
				}
				dialog.setContentView(scroll);
				dialog.show();
			});
		},
		showDeleteBoxDataDialog:function(item){
			GUI.uiThread(function(){
				let dialog=new AlertDialog(ctx);
				dialog.setTitle("StorageBox delete data");
				dialog.setPositiveButton("OK",new android.content.DialogInterface.OnClickListener(){
					onClick:function(){
						let file=new java.io.File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox/"+item);
						file.delete();
						boxdatasub={};
						boxdatasub2={};
						System.loadBoxFileInfo();
						System.loadBoxFileInfo2();
						GUI.showCompleteDeleteDataDialog();
					}
				});
				if(ModPE.getLanguage()=="ja_JP"){
					dialog.setMessage(item+"\n\nこのデータを完全に消去します。よろしいですか？\n\n※消したデータは復元できません。");
					dialog.setNeutralButton("キャンセル",new android.content.DialogInterface.OnClickListener(){
						onClick:function(){
							GUI.showCancelDeleteDataDialog();
						}
					});
				}else{
					dialog.setMessage(item+"\n\nDelete this data completely. Is it OK?\n\n※Delete data can not be restored.");
					dialog.setNeutralButton("Cancel",new android.content.DialogInterface.OnClickListener(){
						onClick:function(){
							GUI.showCancelDeleteDataDialog();
						}
					});
				}
				dialog.show();
			});
		},
		showCompleteDeleteDataDialog:function(){
			GUI.uiThread(function(){
				let dialog=new AlertDialog(ctx);
				dialog.setTitle("StorageBox delete data");
				dialog.setPositiveButton("OK",new android.content.DialogInterface.OnClickListener(){
					onClick:function(){}
				});
				if(ModPE.getLanguage()=="ja_JP"){
					dialog.setMessage("データを消去しました。");
				}else{
					dialog.setMessage("Delete data is completed.");
				}
				dialog.show();
			});
		},
		showCancelDeleteDataDialog:function(){
			GUI.uiThread(function(){
				let dialog=new AlertDialog(ctx);
				dialog.setTitle("StorageBox delete data");
				dialog.setPositiveButton("OK",new android.content.DialogInterface.OnClickListener(){
					onClick:function(){}
				});
				if(ModPE.getLanguage()=="ja_JP"){
					dialog.setMessage("データの消去をキャンセルしました。");
				}else{
					dialog.setMessage("Delete data is canceled.");
				}
				dialog.show();
			});
		}
	}
})();

var System=(function(){
	var File=java.io.File;
	var FileReader=java.io.FileReader;
	var BufferedReader=java.io.BufferedReader;
	var FileOutputStream=java.io.FileOutputStream;
	var OutputStreamWriter=java.io.OutputStreamWriter;
	var InputStreamReader=java.io.InputStreamReader;
	var URL=java.net.URL;
	var Uri=android.net.Uri;
	var Intent=android.content.Intent;
	var version_url=new URL("https://raw.githubusercontent.com/hiro0209/StorageBox-for-MCPE/hiro0209-patch-1/StorageBox%20version.txt").openStream();
	return{
		useBox:function(x,y,z,id,bi,side){
			let xx=Math.floor(x);
			let yy=Math.floor(y);
			let zz=Math.floor(z);
			let px=Math.floor(getPlayerX());
			let py=Math.floor(getPlayerY());
			let pz=Math.floor(getPlayerZ());
			if(id==storage_box||id==storage_box_gold){
				if(Entity.isSneaking(getPlayerEnt())){
					let boxinfo=System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()));
					let ID=Number(boxinfo[0]);
					let data=Number(boxinfo[1]);
					let amo=Number(boxinfo[2]);
					if(amo>0&&!isItem(ID)&&!isFood(ID)){
						switch(side){
							case 0:
								if(px==xx&&py+1==yy&&pz==zz){
									break;
								}else{
									let block=Level.getTile(x,y-1,z);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x,y-1,z,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 1:
								if(px==xx&&py-2==yy&&pz==zz){
									break;
								}else{
									let block=Level.getTile(x,y+1,z);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x,y+1,z,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 2:
								if(px==xx&&(py==yy||py-1==yy)&&pz+1==zz){
									break;
								}else{
									let block=Level.getTile(x,y,z-1);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x,y,z-1,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 3:
								if(px==xx&&(py==yy||py-1==yy)&&pz-1==zz){
									break;
								}else{
									let block=Level.getTile(x,y,z+1);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x,y,z+1,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 4:
								if(px+1==xx&&(py==yy||py-1==yy)&&pz==zz){
									break;
								}else{
									let block=Level.getTile(x-1,y,z);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x-1,y,z,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 5:
								if(px-1==xx&&(py==yy||py-1==yy)&&pz==zz){
									break;
								}else{
									let block=Level.getTile(x+1,y,z);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x+1,y,z,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
						}
					}
				}else{
					let boxinfo=System.loadBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()));
					let ID=Number(boxinfo[0]);
					var data=Number(boxinfo[1]);
					var amo=Number(boxinfo[2]);
					if(amo>0&&bi!=23&&bi!=25&&bi!=26&&bi!=54&&bi!=55&&bi!=58&&bi!=61&&bi!=62&&bi!=63&&bi!=64&&bi!=68&&bi!=69&&bi!=71&&bi!=77&&bi!=92&&bi!=93&&bi!=94&&bi!=96&&bi!=107&&bi!=116&&bi!=117&&bi!=118&&bi!=125&&bi!=143&&bi!=145&&bi!=146&&bi!=149&&bi!=150&&bi!=151&&bi!=154&&bi!=167&&bi!=178&&bi!=183&&bi!=184&&bi!=185&&bi!=186&&bi!=187&&bi!=193&&bi!=194&&bi!=195&&bi!=196&&bi!=197&&bi!=199&&!isItem(ID)&&!isFood(ID)){
						switch(side){
							case 0:
								if(px==xx&&py+1==yy&&pz==zz){
									break;
								}else{
									let block=Level.getTile(x,y-1,z);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x,y-1,z,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 1:
								if(px==xx&&py-2==yy&&pz==zz){
									break;
								}else{
									let block=Level.getTile(x,y+1,z);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x,y+1,z,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 2:
								if(px==xx&&(py==yy||py-1==yy)&&pz+1==zz){
									break;
								}else{
									let block=Level.getTile(x,y,z-1);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x,y,z-1,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 3:
								if(px==xx&&(py==yy||py-1==yy)&&pz-1==zz){
									break;
								}else{
									let block=Level.getTile(x,y,z+1);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x,y,z+1,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 4:
								if(px+1==xx&&(py==yy||py-1==yy)&&pz==zz){
									break;
								}else{
									let block=Level.getTile(x-1,y,z);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x-1,y,z,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
							case 5:
								if(px-1==xx&&(py==yy||py-1==yy)&&pz==zz){
									break;
								}else{
									let block=Level.getTile(x+1,y,z);
									if(block==0||block==8||block==9||block==10||block==11){
										Level.playSound(x,y,z,"dig.stone",500,1);
										amo--;
										boxdata[2]=amo;
										setTile(x+1,y,z,ID,data);
										if(amo!=0){
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),String(ID),String(data),String(amo));
										}else{
											System.saveBoxInfo(Player.getItemCustomName(Player.getSelectedSlotId()),"0","0","0");
										}
									}
								}
							break;
						}
					}
				}
			}
		},
		saveBoxInfo:function(name,id,data,amount){
			boxdatasub[name]=[id,data,amount];
		},
		loadBoxInfo:function(name){
			if(boxdatasub[name]!=undefined){
				return boxdatasub[name];
			}else{
				return [0,0,0];
			}
		},
		saveBoxFileInfo:function(){
			let object=Object.keys(boxdatasub);
			let path=new File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox");
			path.mkdirs();
			for(let i=0;i<object.length;i++){
				let file=new File(path,object[i]);
				file.createNewFile();
				let stream=new FileOutputStream(file);
				let writer=new OutputStreamWriter(stream);
				writer.write(boxdatasub[object[i]][0]+"\n"+boxdatasub[object[i]][1]+"\n"+boxdatasub[object[i]][2]);
				writer.close();
			}
		},
		loadBoxFileInfo:function(){
			let path=new File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox/");
			let files=path.listFiles();
			if(files!=null){
				for(let i=0;i<files.length;i++){
					let read=new FileReader(files[i]);
					let reader=new BufferedReader(read);
					let info=[];
					info.push(reader.readLine());
					info.push(reader.readLine());
					info.push(reader.readLine());
					reader.close();
					boxdatasub[files[i].getName()]=info;
				}
			}
		},
		saveBoxInfo2:function(name,id,data,amount,id2,data2,amount2){
			boxdatasub2[name]=[id,data,amount,id2,data2,amount2];
		},
		loadBoxInfo2:function(name){
			if(boxdatasub2[name]!=undefined){
				return boxdatasub2[name];
			}else{
				return [0,0,0,0,0,0];
			}
		},
		saveBoxFileInfo2:function(){
			let object=Object.keys(boxdatasub2);
			let path=new File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox");
			path.mkdirs();
			for(let i=0;i<object.length;i++){
				let file=new File(path,object[i]);
				file.createNewFile();
				let stream=new FileOutputStream(file);
				let writer=new OutputStreamWriter(stream);
				writer.write(boxdatasub2[object[i]][0]+"\n"+boxdatasub2[object[i]][1]+"\n"+boxdatasub2[object[i]][2]+"\n"+boxdatasub2[object[i]][3]+"\n"+boxdatasub2[object[i]][4]+"\n"+boxdatasub[object[i]][5]);
				writer.close();
			}
		},
		loadBoxFileInfo2:function(){
			let path=new File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox/");
			let files=path.listFiles();
			if(files.length>0){
				for(let i=0;i<files.length;i++){
					let read=new FileReader(files[i]);
					let reader=new BufferedReader(read);
					let info=[];
					info.push(reader.readLine());
					info.push(reader.readLine());
					info.push(reader.readLine());
					info.push(reader.readLine());
					info.push(reader.readLine());
					info.push(reader.readLine());
					reader.close();
					boxdatasub2[files[i].getName()]=info;
				}
			}
		},
		deleteSaveData:function(name){
			let path=new File(sdcard,"games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/StorageBox/"+name);
			if(path.exists()){
				path.delete();
			}
		},
		addItemInventory:function(id,amount,data){
			let amo=amount;
			for(let i=9;i<=44&&amo>0;i++){
				if(Player.getInventorySlot(i)==id&&Player.getInventorySlotData(i)==data){
					if(Player.getInventorySlotCount(i)+amo<=64){
						Player.setInventorySlot(i,id,Player.getInventorySlotCount(i)+amo,data);
						amo=0;
					}
					if(Player.getInventorySlotCount(i)+amo>64){
						let minus=64-Player.getInventorySlotCount(i);
						amo-=minus;
						Player.setInventorySlot(i,id,64,data);
					}
				}
				if(Player.getInventorySlot(i)==0){
					if(amo<=64){
						Player.setInventorySlot(i,id,amo,data);
						amo=0;
					}else{
						for(let ii=9,adds=true;ii<=44&&adds;ii++){
							if(Player.getInventorySlot(ii)==0){
								Player.setInventorySlot(ii,id,64,data);
								amo-=64;
								adds=false;
							}
						}
					}
				}
			}
			return amo;
		},
		guiImageManager:function(){
			let folder=new File(sdcard,"games/com.mojang/StorageBox");
			let nomedia=new File(folder,".nomedia");
			let verfile=new File(folder,"version.txt");
			if(!folder.exists()) folder.mkdirs();
			if(!verfile.exists()){
				nomedia.createNewFile();
				verfile.createNewFile();
				let stream=new FileOutputStream(verfile);
				let writer=new OutputStreamWriter(stream);
				writer.write(versionname);
				writer.close();
				createGuiImages();
				saveGuiImages();
			}
		},
		getBlockLauncherVersionCode:function(){
			let manager=ctx.getPackageManager();
			let info=manager.getPackageInfo(ctx.getPackageName(),0);
			return info.versionCode;
		},
		getBlockLauncherVersionName:function(){
			let manager=ctx.getPackageManager();
			let info=manager.getPackageInfo(ctx.getPackageName(),0);
			return info.versionName;
		},
		createFont:function(){
			let font_byte=ModPE.getBytesFromTexturePack("minecraft.ttf");
			let file=new File(sdcard,"games/com.mojang/minecraft.ttf");
			if(!file.exists()){
				file.createNewFile();
				let writer=new FileOutputStream(file);
				writer.write(font_byte);
				writer.close();
			}
			font=android.graphics.Typeface.createFromFile(file);
		},
		loadVersion:function(){
			let input=new InputStreamReader(version_url);
			let reader=new BufferedReader(input);
			let data=reader.readLine();
			reader.close();
			versionname=data;
		}
	}
})();


var CraftingHook=(function(){
	var flag=false;
	var inventory=[];
	for(var i=0;i<=44;i++){
		inventory.push([]);
	}
	return{
		setFlag:function(booleans){
			flag=booleans;
		},
		getFlag:function(){
			return flag;
		},
		setInventoryData:function(slot,id,amo,data){
			inventory[slot][0]=id;
			inventory[slot][1]=amo;
			inventory[slot][2]=data;
		},
		getInventoryData:function(){
			return inventory;
		},
		useCraftingTable:function(blockId){
			if(blockId==58){
				for(var i=9;i<=44;i++){
					CraftingHook.setInventoryData(i,Player.getInventorySlot(i),Player.getInventorySlotCount(i),Player.getInventorySlotData(i));
				}
				CraftingHook.setFlag(true);
			}
		},
		checkInventory:function(){
			if(CraftingHook.getFlag()){
				var inv=CraftingHook.getInventoryData();
				for(var i=9;i<=44;i++){
					if(Player.getInventorySlot(i)!=0&&inv[i][1]<Player.getInventorySlotCount(i)){
						var addid=Player.getInventorySlot(i);
						var adddata=Player.getInventorySlotData(i);
						var plus=Player.getInventorySlotCount(i)-inv[i][1];
						let counts={};
						let material=[];
						for(let ii=9;ii<=44;ii++){
							if(Player.getInventorySlot(ii)==inv[ii][0]&&Player.getInventorySlotData(ii)==inv[ii][2]&&Player.getInventorySlotCount(ii)<inv[ii][1]){
								counts[Player.getInventorySlot(ii)+":"+Player.getInventorySlotData(ii)+":"+ii]=inv[ii][1]-Player.getInventorySlotCount(ii);
							}else if(Player.getInventorySlot(ii)!=inv[ii][0]&&Player.getInventorySlot(ii)!=addid){
								let keys=inv[ii][0]+":"+inv[ii][2]+":"+ii;
								counts[keys]=(counts[keys])? counts[keys]+=1:1;
							}
						}
						let keys=Object.keys(counts);
						for(let ii=0;ii<keys.length;ii++){
							let materialinfo=keys[ii].split(":");
							material.push([Number(materialinfo[0]),Number(materialinfo[1]),counts[keys[ii]],Player.getItemCustomName(Number(materialinfo[2]))]);
						}
						for(var ii=9;ii<=44;ii++){
							if(inv[ii][1]>Player.getInventorySlotCount(ii)){
								try{
									craftingHook(addid,plus,adddata,material);
								}catch(e){}
								break;
							}
						}
						for(var ii=9;ii<=44;ii++){
							CraftingHook.setInventoryData(ii,Player.getInventorySlot(ii),Player.getInventorySlotCount(ii),Player.getInventorySlotData(ii));
						}
					}
				}
			}
		},
		resetFlag:function(screen){
			if(CraftingHook.getFlag()&&screen!="crafting_screen"){
				CraftingHook.setFlag(false);
			}
		}
	}
})();
(function(){
	let setUseItem=(function(){
		const useItem=this.useItem;
		this.useItem=function(x,y,z,ii,bi,s,id,bd){
			CraftingHook.useCraftingTable(bi);
			if(typeof useItem==="function")useItem.call(this,x,y,z,ii,bi,s,id,bd);
		};
	})();
	let setScreenChangeHook=(function(){
		const screenChangeHook=this.screenChangeHook;
		this.screenChangeHook=function(screen){
			CraftingHook.resetFlag(screen);
			if(typeof screenChangeHook==="function")screenChangeHook.call(this,screen);
		};
	})();
	let setModTick=(function(){
		const modTick=this.modTick;
		this.modTick=function(){
			CraftingHook.checkInventory();
			if(typeof modTick==="function")modTick.call(this);
		};
	})();
})();


var metrics=new android.util.DisplayMetrics();
ctx.getWindowManager().getDefaultDisplay().getMetrics(metrics);
if(metrics.heightPixels>metrics.widthPixels){
	displayHeight=metrics.widthPixels;
	displayWidth=metrics.heightPixels;
}else{
	displayHeight=metrics.heightPixels;
	displayWidth=metrics.widthPixels;
}

function Width(n){
	let Iw=1920;
	let w=displayWidth;
	let thisw=w/Iw*n;
	return thisw;
}

function Height(n){
	let Ih=1080;
	let h=displayHeight;
	let thish=h/Ih*n;
	return thish;
}

function BarHeight(){
	let value=new android.util.TypedValue();
	if(ctx.getTheme().resolveAttribute(android.R.attr.actionBarSize,value,true)){
		let barHeight=android.util.TypedValue.complexToDimensionPixelSize(value.data,ctx.getResources().getDisplayMetrics());
		return barHeight;
	}
}

function saveError(error){
	let SDcard=android.os.Environment.getExternalStorageDirectory();
	let file=new java.io.File(SDcard.getAbsolutePath(),"games/com.mojang/error.txt");
	file.createNewFile();
	let stream=new java.io.FileOutputStream(file);
	let writer=new java.io.OutputStreamWriter(stream);
	writer.append(String(error));
	writer.close();
}

function saveBitmapPng(name,image){
	let file=new java.io.File(sdcard,"games/com.mojang/StorageBox/"+name+".png");
	let stream=new java.io.FileOutputStream(file);
	let bitmap=image.getBitmap();
	bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG,100,stream);
	stream.close();
}

function loadBitmapPng(name){
	let file=new java.io.File(sdcard,"games/com.mojang/StorageBox/"+name+".png");
	let stream=new java.io.FileInputStream(file);
	let bitmap=android.graphics.drawable.BitmapDrawable(android.graphics.BitmapFactory.decodeStream(stream));
	return bitmap;
}


function procCmd(cmd){
	var cmd=cmd.split(" ");
	if(cmd[0]=="StorageBox"){
		switch(cmd[1]){
			case "help":
				if(cmd[2]=="use"){
					if(ModPE.getLanguage()=="ja_JP"){
						clientMessage("§4===========================\n1, ボックスを持って真下のブロックをスニークタップでGUI表示\n２, GUIの右のスロットをタップで中身を取り出す\n§4===========================");
					}else{
						clientMessage("§4===========================\n1, Hold the StorageBox and tap on the block beneath the player to display the GUI.\n２, Tap the slot on the right of the GUI to take out the items.\n§4===========================");
					}
				}
				if(cmd[2]==null){
					if(ModPE.getLanguage()=="ja_JP"){
						clientMessage("§4===========================\n/StorageBox help use : 使い方のヘルプ\n/StorageBox help : コマンドのヘルプ\n/StorageBox datalist : ストレージボックスのデータ一覧\n/StorageBox auto ON/OFF : 自動回収のON/OFF切り替え\n/StorageBox update : アップデートマネージャーを起動\n§4===========================");
					}else{
						clientMessage("§4===========================\n/StorageBox help use : Show help of using.\n/StorageBox help : Show command list.\n/StorageBox datalist : Show data list at StorageBox.\n/StorageBox auto ON/OFF : Toggle automatic collection on and off.\n/StorageBox update : Start update manager.\n§4===========================");
					}
				}
				break;
			case "datalist":
				GUI.showBoxDataList();
				break;
			case "auto":
				if(cmd[2]=="ON") autocollection=true;
				if(cmd[2]=="OFF") autocollection=false;
				break;
			case "update":
				let update=UpdateManager.versionManager();
				if(!update){
					GUI.uiThread(function(){
						let dialog=new android.app.AllertDialog.Builder(ctx);
						dialog.setTitle("StorageBox update");
						if(ModPE.getLanguage()=="ja_JP"){
							dialog.setMessage("お使いのバージョンは最新版です。");
						}else{
							dialog.setMessage("This version is latest version.");
						}
						dialog.show();
					});
				}
				break;
		}
	}
}

function newLevel(){
	let all=Entity.getAll();
	for(let i=0;i<all.length;i++){
		let ent=Entity.getEntityTypeId(all[i]);
		if(ent==64){
			dropitems.push(all[i]);
		}
	}
	System.loadBoxFileInfo();
}

function leaveGame(){
	dropitems.length=0;
}

function useItem(x,y,z,ii,bi,s){
	let xx=Math.floor(x),yy=Math.floor(y),zz=Math.floor(z);
	let px=Math.floor(getPlayerX()),py=Math.floor(getPlayerY()),pz=Math.floor(getPlayerZ());
	System.useBox(x,y,z,ii,bi,s);
	if(Entity.isSneaking(getPlayerEnt())&&ii==storage_box){
		if(xx==px&&yy==py-2&&zz==pz){
			if(!viewscreen){
				viewscreen=true;
				GUI.addSettingScreen();
			}
		}
	}
	if(Entity.isSneaking(getPlayerEnt())&&ii==storage_box_iron){
		if(xx==px&&yy==py-2&&zz==pz){
			if(!viewscreen){
				viewscreen=true;
				GUI.addSettingScreen2();
			}
		}
	}
	if(Entity.isSneaking(getPlayerEnt())&&ii==storage_box_gold){
		if(xx==px&&yy==py-2&&zz==pz){
			if(!viewscreen){
				viewscreen=true;
				GUI.addSettingScreen();
			}
		}
	}
	if(Entity.isSneaking(getPlayerEnt())&&ii==storage_box_diamond){
		if(xx==px&&yy==py-2&&zz==pz){
			if(!viewscreen){
				viewscreen=true;
				GUI.addSettingScreen2();
			}
		}
	}
}

function entityAddedHook(entity){
	let ent=Entity.getEntityTypeId(entity);
	if(ent==64){
		dropitems.push(entity);
		if(deathplayer){
			if(Entity.getItemEntityId(entity)==storage_box_gold||Entity.getItemEntityId(entity)==storage_box_diamond){
				Entity.remove(entity);
			}
		}
	}
}

function entityRemovedHook(entity){
	let ent=Entity.getEntityTypeId(entity);
	if(ent==64){
		let index=dropitems.indexOf(entity);
		dropitems.splice(index,1);
	}
}

function entityHurtHook(attacker,victim,hurt){
	if(victim==getPlayerEnt()){
		GUI.backSettingScreen();
	}
}

function deathHook(murderer,victim){
	if(victim==getPlayerEnt()){
		GUI.backSettingScreen();
		for(let i=9;i<=44;i++){
			if(Player.getInventorySlot(i)==storage_box_gold){
				deathedgoldbox.push(Player.getItemCustomName(i));
			}
			if(Player.getInventorySlot(i)==storage_box_diamond){
				deatheddiabox.push(Player.getItemCustomName(i));
			}
		}
		deathplayer=true;
	}
}

function screenChangeHook(screen){
	if(screen=="hud_screen"&&dropitems.length!=0&&autocollection){
		flag=true;
	}
	if(screen!="hud_screen"&&screen!="in_game_play_screen"){
		flag=false;
	}
	if(screen=="pause_screen"){
		System.saveBoxFileInfo();
	}
}

function modTick(){
	count++;
	//ボックス復活
	if(deathplayer){
		count2++;
		if(count2==20){
			for(let i=0;i<deathedgoldbox.length;i++){
				addinventory:for(let ii=9;ii<=44;ii++){
					if(Player.getInventorySlot(ii)==0){
						Player.setInventorySlot(ii,storage_box_gold,1,0);
						if(deathedgoldbox[i]!=null){
							Player.setItemCustomName(ii,deathedgoldbox[i]);
						}
						break addinventory;
					}
				}
			}
			for(let i=0;i<deatheddiabox.length;i++){
				addinventory:for(let ii=9;ii<=44;ii++){
					if(Player.getInventorySlot(ii)==0){
						Player.setInventorySlot(ii,storage_box_diamond,1,0);
						if(deatheddiabox[i]!=null){
							Player.setItemCustomName(ii,deatheddiabox[i]);
						}
						break addinventory;
					}
				}
			}
			deathedgoldbox.length=0;
			deatheddiabox.length=0;
			count2=0;
			deathplayer=false;
		}
	}
	//中身の情報
	if(Player.getCarriedItem()==storage_box||Player.getCarriedItem()==storage_box_gold){
		let customname=Player.getItemCustomName(Player.getSelectedSlotId());
		let info=System.loadBoxInfo(customname);
		boxdata[0]=Number(info[0]);
		boxdata[1]=Number(info[1]);
		boxdata[2]=Number(info[2]);
		let name=Item.getName(boxdata[0],boxdata[1],false);
		let stack=Math.floor(boxdata[2]/64);
		let nostack=boxdata[2]%64;
		ModPE.showTipMessage("\n\n\n"+name+"/"+stack+"stacks+"+nostack+"items("+boxdata[2]+"items)");
	}
	if(Player.getCarriedItem()==storage_box_iron||Player.getCarriedItem()==storage_box_diamond){
		let customname=Player.getItemCustomName(Player.getSelectedSlotId());
		let info=System.loadBoxInfo2(customname);
		boxdata2[0]=Number(info[0]);
		boxdata2[1]=Number(info[1]);
		boxdata2[2]=Number(info[2]);
		boxdata2[3]=Number(info[3]);
		boxdata2[4]=Number(info[4]);
		boxdata2[5]=Number(info[5]);
		let name=Item.getName(boxdata2[0],boxdata2[1],false);
		let stack=Math.floor(boxdata2[2]/64);
		let nostack=boxdata2[2]%64;
		let name2=Item.getName(boxdata2[3],boxdata2[4],false);
		let stack2=Math.floor(boxdata2[5]/64);
		let nostack2=boxdata2[5]%64;
		ModPE.showTipMessage("\n\n\n"+name+"/"+stack+"stacks+"+nostack+"items("+boxdata2[2]+"items)\n"+name2+"/"+stack2+"stacks+"+nostack2+"items("+boxdata2[5]+"items)");
	}
	//自動回収
	if(!flag&&!resetinvco){
		for(let i=9;i<=44;i++){
			invco[i]["addinv"]=false;
			invco[i]["id"]=0;
			invco[i]["count"]=0;
		}
		resetinvco=true;
	}
	if(flag&&count==2&&(Player.getCarriedItem()==storage_box||Player.getCarriedItem()==storage_box_gold)){
		new java.lang.Thread(function(){
			android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);
			for(let i=9;i<=44;i++){
				if(invco[i]["addinv"]==false){
					invco[i]["count"]=Player.getInventorySlotCount(i);
					invco[i]["id"]=Player.getInventorySlot(i);
					invco[i]["addinv"]=true;
				}
				if(invco[i]["addinv"]==true){
					if(invco[i]["id"]==0&&Player.getInventorySlot(i)!=0){
						let change=Player.getInventorySlotCount(i)-invco[i]["count"];
						let addid=Player.getInventorySlot(i);
						let adddata=Player.getInventorySlotData(i);
						for(let ii=9;ii<=44;ii++){
							if(Player.getInventorySlot(ii)==storage_box){
								let info=System.loadBoxInfo(Player.getItemCustomName(ii));
								let id=Number(info[0]);
								let data=Number(info[1]);
								let amount=Number(info[2]);
								if(id==addid&&data==adddata){
									if(Player.getInventorySlotCount(i)-change<=0){
										Player.clearInventorySlot(i);
									}
									if(Player.getInventorySlotCount(i)-change>0){
										Player.setInventorySlot(i,id,Player.getInventorySlotCount(i)-change,data);
									}
									System.saveBoxInfo(Player.getItemCustomName(ii),id,data,amount+change);
								}
							}
						}
						invco[i]["addinv"]=false;
					}
					if(Player.getInventorySlotCount(i)>invco[i]["count"]&&Player.getInventorySlot(i)==invco[i]["id"]){
						let change=Player.getInventorySlotCount(i)-invco[i]["count"];
						let addid=Player.getInventorySlot(i);
						let adddata=Player.getInventorySlotData(i);
						for(let ii=9;ii<=44;ii++){
							if(Player.getInventorySlot(ii)==storage_box){
								let info=System.loadBoxInfo(Player.getItemCustomName(ii));
								let id=Number(info[0]);
								let data=Number(info[1]);
								let amount=Number(info[2]);
								if(id==addid&&data==adddata){
									if(Player.getInventorySlotCount(i)-change<=0){
										Player.clearInventorySlot(i);
									}
									if(Player.getInventorySlotCount(i)-change>0){
										Player.setInventorySlot(i,id,Player.getInventorySlotCount(i)-change,data);
									}
									System.saveBoxInfo(Player.getItemCustomName(ii),id,data,amount+change);
								}
							}
						}
						invco[i]["addinv"]=false;
					}
					if(Player.getInventorySlotCount(i)<invco[i]["count"]){
						invco[i]["addinv"]=false;
					}
				}
			}
		}).start();
		count=0;
		resetinvco=false;
	}
	if(count==2) count=0;
}


var item=[
	{
		"id":element_storage_box1,
		"name":"Element of StorageBox ★1",
		"texture":"element_storagebox",
		"group":0,
		"stock":64,
		"category":4
	},
	{
		"id":element_storage_box2,
		"name":"Element of StorageBox ★2",
		"texture":"element_storagebox",
		"group":1,
		"stock":64,
		"category":4
	},
	{
		"id":storage_box,
		"name":"StorageBox",
		"texture":"box_default",
		"group":0,
		"stock":1,
		"category":3
	},
	{
		"id":storage_box_iron,
		"name":"Iron StorageBox",
		"texture":"box_iron",
		"group":0,
		"stock":1,
		"category":3
	},
	{
		"id":storage_box_gold,
		"name":"Gold StorageBox",
		"texture":"box_gold",
		"group":0,
		"stock":1,
		"category":3
	},
	{
		"id":storage_box_diamond,
		"name":"Diamond StorageBox",
		"texture":"box_diamond",
		"group":0,
		"stock":1,
		"category":3
	}
];

try{
System.loadVersion();
System.guiImageManager();
System.createFont();

for(let i=0;i<=44;i++){
	invco[i]={"count":0,"id":0,"addinv":false};
}

for(let i=0;i<item.length;i++){
	ModPE.setItem(item[i]["id"],item[i]["texture"],item[i]["group"],item[i]["name"],item[i]["stock"]);
	Item.setCategory(item[i]["id"],item[i]["category"]);
	Player.addItemCreativeInv(item[i]["id"],1,0);
}

Item.addShapedRecipe(element_storage_box1,1,0,[
 "aaa",
 "aaa",
 "aaa"],["a",54,0]);

Item.addShapedRecipe(element_storage_box2,1,0,[
 "aaa",
 "aaa",
 "aaa"],["a",element_storage_box1,0]);

Item.addShapedRecipe(storage_box,1,0,[
 "aaa",
 "a a",
 "aaa"],["a",54,0]);

Item.addShapedRecipe(storage_box_iron,1,0,[
 "aaa",
 "bcb",
 "ddd"],["a",42,0,"b",331,0,"c",element_storage_box1,0,"d",265,0]);

Item.addShapedRecipe(storage_box_gold,1,0,[
 "aaa",
 "bcb",
 "ddd"],["a",41,0,"b",331,0,"c",element_storage_box1,0,"d",266,0]);

Item.addShapedRecipe(storage_box_diamond,1,0,[
 "aaa",
 "bcb",
 "ddd"],["a",57,0,"b",331,0,"c",element_storage_box2,0,"d",264,0]);

}catch(e){
ctx.runOnUiThread(new java.lang.Runnable({
	run:function(){
		let dialog=new android.app.AlertDialog.Builder(ctx);
		dialog.setTitle("Error: StorageBox");
		if(ModPE.getLanguage()=="ja_JP"){
			dialog.setMessage("テクスチャが適用されていません。\nテクスチャを適用してください。\n\nエラーコード:\n"+e);
		}else{
			dialog.setMessage("Texture is not applicationed.\nPlease apply texture.\n\nError Code:\n"+e);
		}
		dialog.show();
	}
}));
}

function createGuiImages(){
//アイテム
slot256_0=GUI.createItemImages("item_256_0");
slot257_0=GUI.createItemImages("item_257_0");
slot258_0=GUI.createItemImages("item_258_0");
slot259_0=GUI.createItemImages("item_259_0");
slot261_0=GUI.createItemImages("item_261_0");
slot262_0=GUI.createItemImages("item_262_0");
slot263_0=GUI.createItemImages("item_263_0");
slot263_1=GUI.createItemImages("item_263_1");
slot264_0=GUI.createItemImages("item_264_0");
slot265_0=GUI.createItemImages("item_265_0");
slot266_0=GUI.createItemImages("item_266_0");
slot267_0=GUI.createItemImages("item_267_0");
slot268_0=GUI.createItemImages("item_268_0");
slot269_0=GUI.createItemImages("item_269_0");
slot270_0=GUI.createItemImages("item_270_0");
slot271_0=GUI.createItemImages("item_271_0");
slot272_0=GUI.createItemImages("item_272_0");
slot273_0=GUI.createItemImages("item_273_0");
slot274_0=GUI.createItemImages("item_274_0");
slot275_0=GUI.createItemImages("item_275_0");
slot276_0=GUI.createItemImages("item_276_0");
slot277_0=GUI.createItemImages("item_277_0");
slot278_0=GUI.createItemImages("item_278_0");
slot279_0=GUI.createItemImages("item_279_0");
slot280_0=GUI.createItemImages("item_280_0");
slot281_0=GUI.createItemImages("item_281_0");
slot283_0=GUI.createItemImages("item_283_0");
slot284_0=GUI.createItemImages("item_284_0");
slot285_0=GUI.createItemImages("item_285_0");
slot286_0=GUI.createItemImages("item_286_0");
slot287_0=GUI.createItemImages("item_287_0");
slot288_0=GUI.createItemImages("item_288_0");
slot289_0=GUI.createItemImages("item_289_0");
slot290_0=GUI.createItemImages("item_290_0");
slot291_0=GUI.createItemImages("item_291_0");
slot292_0=GUI.createItemImages("item_292_0");
slot293_0=GUI.createItemImages("item_293_0");
slot294_0=GUI.createItemImages("item_294_0");
slot295_0=GUI.createItemImages("item_295_0");
slot296_0=GUI.createItemImages("item_296_0");
slot302_0=GUI.createItemImages("item_302_0");
slot303_0=GUI.createItemImages("item_303_0");
slot304_0=GUI.createItemImages("item_304_0");
slot305_0=GUI.createItemImages("item_305_0");
slot306_0=GUI.createItemImages("item_306_0");
slot307_0=GUI.createItemImages("item_307_0");
slot308_0=GUI.createItemImages("item_308_0");
slot309_0=GUI.createItemImages("item_309_0");
slot310_0=GUI.createItemImages("item_310_0");
slot311_0=GUI.createItemImages("item_311_0");
slot312_0=GUI.createItemImages("item_312_0");
slot313_0=GUI.createItemImages("item_313_0");
slot314_0=GUI.createItemImages("item_314_0");
slot315_0=GUI.createItemImages("item_315_0");
slot316_0=GUI.createItemImages("item_316_0");
slot317_0=GUI.createItemImages("item_317_0");
slot318_0=GUI.createItemImages("item_318_0");
slot321_0=GUI.createItemImages("item_321_0");
slot322_0=GUI.createItemImages("item_322_0");
slot323_0=GUI.createItemImages("item_323_0");
slot324_0=GUI.createItemImages("item_324_0");
slot325_0=GUI.createItemImages("item_325_0");
slot325_1=GUI.createItemImages("item_325_1");
slot325_8=GUI.createItemImages("item_325_8");
slot325_10=GUI.createItemImages("item_325_10");
slot328_0=GUI.createItemImages("item_328_0");
slot329_0=GUI.createItemImages("item_329_0");
slot330_0=GUI.createItemImages("item_330_0");
slot331_0=GUI.createItemImages("item_331_0");
slot332_0=GUI.createItemImages("item_332_0");
slot333_0=GUI.createItemImages("item_333_0");
slot333_1=GUI.createItemImages("item_333_1");
slot333_2=GUI.createItemImages("item_333_2");
slot333_3=GUI.createItemImages("item_333_3");
slot333_4=GUI.createItemImages("item_333_4");
slot333_5=GUI.createItemImages("item_333_5");
slot334_0=GUI.createItemImages("item_334_0");
slot336_0=GUI.createItemImages("item_336_0");
slot337_0=GUI.createItemImages("item_337_0");
slot338_0=GUI.createItemImages("item_338_0");
slot339_0=GUI.createItemImages("item_339_0");
slot340_0=GUI.createItemImages("item_340_0");
slot341_0=GUI.createItemImages("item_341_0");
slot342_0=GUI.createItemImages("item_342_0");
slot343_0=GUI.createItemImages("item_343_0");
slot344_0=GUI.createItemImages("item_344_0");
slot345_0=GUI.createItemImages("item_345_0");
slot346_0=GUI.createItemImages("item_346_0");
slot347_0=GUI.createItemImages("item_347_0");
slot348_0=GUI.createItemImages("item_348_0");
slot351_0=GUI.createItemImages("item_351_0");
slot351_1=GUI.createItemImages("item_351_1");
slot351_2=GUI.createItemImages("item_351_2");
slot351_3=GUI.createItemImages("item_351_3");
slot351_4=GUI.createItemImages("item_351_4");
slot351_5=GUI.createItemImages("item_351_5");
slot351_6=GUI.createItemImages("item_351_6");
slot351_7=GUI.createItemImages("item_351_7");
slot351_8=GUI.createItemImages("item_351_8");
slot351_9=GUI.createItemImages("item_351_9");
slot351_10=GUI.createItemImages("item_351_10");
slot351_11=GUI.createItemImages("item_351_11");
slot351_12=GUI.createItemImages("item_351_12");
slot351_13=GUI.createItemImages("item_351_13");
slot351_14=GUI.createItemImages("item_351_14");
slot351_15=GUI.createItemImages("item_351_15");
slot352_0=GUI.createItemImages("item_352_0");
slot353_0=GUI.createItemImages("item_353_0");
slot354_0=GUI.createItemImages("item_354_0");
slot355_0=GUI.createItemImages("item_355_0");
slot356_9=GUI.createItemImages("item_356_9");
slot358_0=GUI.createItemImages("item_358_0");
slot359_0=GUI.createItemImages("item_359_0");
slot361_0=GUI.createItemImages("item_361_0");
slot362_0=GUI.createItemImages("item_362_0");
slot368_0=GUI.createItemImages("item_368_0");
slot369_0=GUI.createItemImages("item_369_0");
slot370_0=GUI.createItemImages("item_370_0");
slot371_0=GUI.createItemImages("item_371_0");
slot372_0=GUI.createItemImages("item_372_0");
slot373_0=GUI.createItemImages("item_373_0");
slot374_0=GUI.createItemImages("item_374_0");
slot376_0=GUI.createItemImages("item_376_0");
slot377_0=GUI.createItemImages("item_377_0");
slot378_0=GUI.createItemImages("item_378_0");
slot379_0=GUI.createItemImages("item_379_0");
slot380_0=GUI.createItemImages("item_380_0");
slot381_0=GUI.createItemImages("item_381_0");
slot382_0=GUI.createItemImages("item_382_0");
slot384_0=GUI.createItemImages("item_384_0");
slot385_0=GUI.createItemImages("item_385_0");
slot388_0=GUI.createItemImages("item_388_0");
slot389_0=GUI.createItemImages("item_389_0");
slot390_0=GUI.createItemImages("item_390_0");
slot395_0=GUI.createItemImages("item_395_0");
slot397_0=GUI.createItemImages("item_397_0");
slot397_1=GUI.createItemImages("item_397_1");
slot397_2=GUI.createItemImages("item_397_2");
slot397_3=GUI.createItemImages("item_397_3");
slot397_4=GUI.createItemImages("item_397_4");
slot397_5=GUI.createItemImages("item_397_5");
slot398_0=GUI.createItemImages("item_398_0");
slot399_0=GUI.createItemImages("item_399_0");
slot401_0=GUI.createItemImages("item_401_0");
slot402_0=GUI.createItemImages("item_402_0");
slot403_0=GUI.createItemImages("item_403_0");
slot404_0=GUI.createItemImages("item_404_0");
slot405_0=GUI.createItemImages("item_405_0");
slot406_0=GUI.createItemImages("item_406_0");
slot407_0=GUI.createItemImages("item_407_0");
slot408_0=GUI.createItemImages("item_408_0");
slot409_0=GUI.createItemImages("item_409_0");
slot410_0=GUI.createItemImages("item_410_0");
slot414_0=GUI.createItemImages("item_414_0");
slot415_0=GUI.createItemImages("item_415_0");
slot417_0=GUI.createItemImages("item_417_0");
slot418_0=GUI.createItemImages("item_418_0");
slot419_0=GUI.createItemImages("item_419_0");
slot420_0=GUI.createItemImages("item_420_0");
slot421_0=GUI.createItemImages("item_421_0");
slot422_0=GUI.createItemImages("item_422_0");
slot426_0=GUI.createItemImages("item_426_0");
slot427_0=GUI.createItemImages("item_427_0");
slot428_0=GUI.createItemImages("item_428_0");
slot429_0=GUI.createItemImages("item_429_0");
slot430_0=GUI.createItemImages("item_430_0");
slot431_0=GUI.createItemImages("item_431_0");
slot432_0=GUI.createItemImages("item_432_0");
slot433_0=GUI.createItemImages("item_433_0");
slot437_0=GUI.createItemImages("item_437_0");
slot439_0=GUI.createItemImages("item_439_0");
slot444_0=GUI.createItemImages("item_444_0");
slot444_431=GUI.createItemImages("item_444_431");
slot445_0=GUI.createItemImages("item_445_0");
slot458_0=GUI.createItemImages("item_458_0");
slot2256_0=GUI.createItemImages("item_2256_0");
slot2257_0=GUI.createItemImages("item_2257_0");
slot2258_0=GUI.createItemImages("item_2258_0");
slot2259_0=GUI.createItemImages("item_2259_0");
slot2260_0=GUI.createItemImages("item_2260_0");
slot2261_0=GUI.createItemImages("item_2261_0");
slot2262_0=GUI.createItemImages("item_2262_0");
slot2263_0=GUI.createItemImages("item_2263_0");
slot2264_0=GUI.createItemImages("item_2264_0");
slot2265_0=GUI.createItemImages("item_2265_0");
slot2266_0=GUI.createItemImages("item_2266_0");
slot2267_0=GUI.createItemImages("item_2267_0");


//ブロック
slot1_0=GUI.createBlockImages("block_1_0");
slot1_1=GUI.createBlockImages("block_1_1");
slot1_2=GUI.createBlockImages("block_1_2");
slot1_3=GUI.createBlockImages("block_1_3");
slot1_4=GUI.createBlockImages("block_1_4");
slot1_5=GUI.createBlockImages("block_1_5");
slot1_6=GUI.createBlockImages("block_1_6");
slot2_0=GUI.createBlockImages("block_2_0");
slot3_0=GUI.createBlockImages("block_3_0");
slot4_0=GUI.createBlockImages("block_4_0");
slot5_0=GUI.createBlockImages("block_5_0");
slot5_1=GUI.createBlockImages("block_5_1");
slot5_2=GUI.createBlockImages("block_5_2");
slot5_3=GUI.createBlockImages("block_5_3");
slot5_4=GUI.createBlockImages("block_5_4");
slot5_5=GUI.createBlockImages("block_5_5");
slot6_0=GUI.createBlockImages("block_6_0");
slot6_1=GUI.createBlockImages("block_6_1");
slot6_2=GUI.createBlockImages("block_6_2");
slot6_3=GUI.createBlockImages("block_6_3");
slot6_4=GUI.createBlockImages("block_6_4");
slot6_5=GUI.createBlockImages("block_6_5");
slot7_0=GUI.createBlockImages("block_7_0");
slot12_0=GUI.createBlockImages("block_12_0");
slot12_1=GUI.createBlockImages("block_12_1");
slot13_0=GUI.createBlockImages("block_13_0");
slot14_0=GUI.createBlockImages("block_14_0");
slot15_0=GUI.createBlockImages("block_15_0");
slot16_0=GUI.createBlockImages("block_16_0");
slot17_0=GUI.createBlockImages("block_17_0");
slot17_1=GUI.createBlockImages("block_17_1");
slot17_2=GUI.createBlockImages("block_17_2");
slot17_3=GUI.createBlockImages("block_17_3");
slot18_0=GUI.createBlockImages("block_18_0");
slot18_1=GUI.createBlockImages("block_18_1");
slot18_2=GUI.createBlockImages("block_18_2");
slot18_3=GUI.createBlockImages("block_18_3");
slot20_0=GUI.createBlockImages("block_20_0");
slot21_0=GUI.createBlockImages("block_21_0");
slot22_0=GUI.createBlockImages("block_22_0");
slot23_0=GUI.createBlockImages("block_23_0");
slot24_0=GUI.createBlockImages("block_24_0");
slot24_1=GUI.createBlockImages("block_24_1");
slot24_2=GUI.createBlockImages("block_24_2");
slot25_0=GUI.createBlockImages("block_25_0");
slot29_1=GUI.createBlockImages("block_29_1");
slot30_0=GUI.createBlockImages("block_30_0");
slot33_1=GUI.createBlockImages("block_33_1");
slot35_0=GUI.createBlockImages("block_35_0");
slot35_1=GUI.createBlockImages("block_35_1");
slot35_2=GUI.createBlockImages("block_35_2");
slot35_3=GUI.createBlockImages("block_35_3");
slot35_4=GUI.createBlockImages("block_35_4");
slot35_5=GUI.createBlockImages("block_35_5");
slot35_6=GUI.createBlockImages("block_35_6");
slot35_7=GUI.createBlockImages("block_35_7");
slot35_8=GUI.createBlockImages("block_35_8");
slot35_9=GUI.createBlockImages("block_35_9");
slot35_10=GUI.createBlockImages("block_35_10");
slot35_11=GUI.createBlockImages("block_35_11");
slot35_12=GUI.createBlockImages("block_35_12");
slot35_13=GUI.createBlockImages("block_35_13");
slot35_14=GUI.createBlockImages("block_35_14");
slot35_15=GUI.createBlockImages("block_35_15");
slot39_0=GUI.createBlockImages("block_39_0");
slot40_0=GUI.createBlockImages("block_40_0");
slot41_0=GUI.createBlockImages("block_41_0");
slot42_0=GUI.createBlockImages("block_42_0");
slot44_0=GUI.createBlockImages("block_44_0");
slot44_1=GUI.createBlockImages("block_44_1");
slot44_3=GUI.createBlockImages("block_44_3");
slot44_4=GUI.createBlockImages("block_44_4");
slot44_5=GUI.createBlockImages("block_44_5");
slot44_6=GUI.createBlockImages("block_44_6");
slot44_7=GUI.createBlockImages("block_44_7");
slot45_0=GUI.createBlockImages("block_45_0");
slot46_0=GUI.createBlockImages("block_46_0");
slot47_0=GUI.createBlockImages("block_47_0");
slot48_0=GUI.createBlockImages("block_48_0");
slot49_0=GUI.createBlockImages("block_49_0");
slot50_0=GUI.createBlockImages("block_50_0");
slot53_0=GUI.createBlockImages("block_53_0");
slot54_0=GUI.createBlockImages("block_54_0");
slot56_0=GUI.createBlockImages("block_56_0");
slot57_0=GUI.createBlockImages("block_57_0");
slot58_0=GUI.createBlockImages("block_58_0");
slot61_0=GUI.createBlockImages("block_61_0");
slot65_0=GUI.createBlockImages("block_65_0");
slot66_0=GUI.createBlockImages("block_66_0");
slot67_0=GUI.createBlockImages("block_67_0");
slot69_0=GUI.createBlockImages("block_69_0");
slot70_0=GUI.createBlockImages("block_70_0");
slot72_0=GUI.createBlockImages("block_72_0");
slot73_0=GUI.createBlockImages("block_73_0");
slot76_0=GUI.createBlockImages("block_76_0");
slot77_5=GUI.createBlockImages("block_77_5");
slot78_0=GUI.createBlockImages("block_78_0");
slot79_0=GUI.createBlockImages("block_79_0");
slot80_0=GUI.createBlockImages("block_80_0");
slot81_0=GUI.createBlockImages("block_81_0");
slot82_0=GUI.createBlockImages("block_82_0");
slot85_0=GUI.createBlockImages("block_85_0");
slot85_1=GUI.createBlockImages("block_85_1");
slot85_2=GUI.createBlockImages("block_85_2");
slot85_3=GUI.createBlockImages("block_85_3");
slot85_4=GUI.createBlockImages("block_85_4");
slot85_5=GUI.createBlockImages("block_85_5");
slot86_0=GUI.createBlockImages("block_86_0");
slot87_0=GUI.createBlockImages("block_87_0");
slot88_0=GUI.createBlockImages("block_88_0");
slot89_0=GUI.createBlockImages("block_89_0");
slot91_0=GUI.createBlockImages("block_91_0");
slot96_0=GUI.createBlockImages("block_96_0");
slot98_0=GUI.createBlockImages("block_98_0");
slot98_1=GUI.createBlockImages("block_98_1");
slot98_2=GUI.createBlockImages("block_98_2");
slot98_3=GUI.createBlockImages("block_98_3");
slot101_0=GUI.createBlockImages("block_101_0");
slot102_0=GUI.createBlockImages("block_102_0");
slot103_0=GUI.createBlockImages("block_103_0");
slot106_0=GUI.createBlockImages("block_106_0");
slot107_0=GUI.createBlockImages("block_107_0");
slot108_0=GUI.createBlockImages("block_108_0");
slot109_0=GUI.createBlockImages("block_109_0");
slot110_0=GUI.createBlockImages("block_110_0");
slot111_0=GUI.createBlockImages("block_111_0");
slot112_0=GUI.createBlockImages("block_112_0");
slot113_0=GUI.createBlockImages("block_113_0");
slot114_0=GUI.createBlockImages("block_114_0");
slot116_0=GUI.createBlockImages("block_116_0");
slot121_0=GUI.createBlockImages("block_121_0");
slot123_0=GUI.createBlockImages("block_123_0");
slot125_0=GUI.createBlockImages("block_125_0");
slot128_0=GUI.createBlockImages("block_128_0");
slot129_0=GUI.createBlockImages("block_129_0");
slot131_0=GUI.createBlockImages("block_131_0");
slot133_0=GUI.createBlockImages("block_133_0");
slot134_0=GUI.createBlockImages("block_134_0");
slot135_0=GUI.createBlockImages("block_135_0");
slot136_0=GUI.createBlockImages("block_136_0");
slot139_0=GUI.createBlockImages("block_139_0");
slot139_1=GUI.createBlockImages("block_139_1");
slot143_5=GUI.createBlockImages("block_143_5");
slot145_0=GUI.createBlockImages("block_145_0");
slot147_0=GUI.createBlockImages("block_147_0");
slot148_0=GUI.createBlockImages("block_148_0");
slot151_0=GUI.createBlockImages("block_151_0");
slot152_0=GUI.createBlockImages("block_152_0");
slot153_0=GUI.createBlockImages("block_153_0");
slot155_0=GUI.createBlockImages("block_155_0");
slot155_1=GUI.createBlockImages("block_155_1");
slot155_2=GUI.createBlockImages("block_155_2");
slot156_0=GUI.createBlockImages("block_156_0");
slot158_0=GUI.createBlockImages("block_158_0");
slot158_1=GUI.createBlockImages("block_158_1");
slot158_2=GUI.createBlockImages("block_158_2");
slot158_3=GUI.createBlockImages("block_158_3");
slot158_4=GUI.createBlockImages("block_158_4");
slot158_5=GUI.createBlockImages("block_158_5");
slot159_0=GUI.createBlockImages("block_159_0");
slot159_1=GUI.createBlockImages("block_159_1");
slot159_2=GUI.createBlockImages("block_159_2");
slot159_3=GUI.createBlockImages("block_159_3");
slot159_4=GUI.createBlockImages("block_159_4");
slot159_5=GUI.createBlockImages("block_159_5");
slot159_6=GUI.createBlockImages("block_159_6");
slot159_7=GUI.createBlockImages("block_159_7");
slot159_8=GUI.createBlockImages("block_159_8");
slot159_9=GUI.createBlockImages("block_159_9");
slot159_10=GUI.createBlockImages("block_159_10");
slot159_11=GUI.createBlockImages("block_159_11");
slot159_12=GUI.createBlockImages("block_159_12");
slot159_13=GUI.createBlockImages("block_159_13");
slot159_14=GUI.createBlockImages("block_159_14");
slot159_15=GUI.createBlockImages("block_159_15");
slot161_0=GUI.createBlockImages("block_161_0");
slot161_1=GUI.createBlockImages("block_161_1");
slot162_0=GUI.createBlockImages("block_162_0");
slot162_1=GUI.createBlockImages("block_162_1");
slot163_0=GUI.createBlockImages("block_163_0");
slot164_0=GUI.createBlockImages("block_164_0");
slot165_0=GUI.createBlockImages("block_165_0");
slot167_0=GUI.createBlockImages("block_167_0");
slot171_0=GUI.createBlockImages("block_171_0");
slot171_1=GUI.createBlockImages("block_171_1");
slot171_2=GUI.createBlockImages("block_171_2");
slot171_3=GUI.createBlockImages("block_171_3");
slot171_4=GUI.createBlockImages("block_171_4");
slot171_5=GUI.createBlockImages("block_171_5");
slot171_6=GUI.createBlockImages("block_171_6");
slot171_7=GUI.createBlockImages("block_171_7");
slot171_8=GUI.createBlockImages("block_171_8");
slot171_9=GUI.createBlockImages("block_171_9");
slot171_10=GUI.createBlockImages("block_171_10");
slot171_11=GUI.createBlockImages("block_171_11");
slot171_12=GUI.createBlockImages("block_171_12");
slot171_13=GUI.createBlockImages("block_171_13");
slot171_14=GUI.createBlockImages("block_171_14");
slot171_15=GUI.createBlockImages("block_171_15");
slot172_0=GUI.createBlockImages("block_172_0");
slot173_0=GUI.createBlockImages("block_173_0");
slot174_0=GUI.createBlockImages("block_174_0");
slot177_0=GUI.createBlockImages("block_177_0");
slot179_0=GUI.createBlockImages("block_179_0");
slot179_1=GUI.createBlockImages("block_179_1");
slot179_2=GUI.createBlockImages("block_179_2");
slot180_0=GUI.createBlockImages("block_180_0");
slot182_0=GUI.createBlockImages("block_182_0");
slot183_0=GUI.createBlockImages("block_183_0");
slot184_0=GUI.createBlockImages("block_184_0");
slot185_0=GUI.createBlockImages("block_185_0");
slot186_0=GUI.createBlockImages("block_186_0");
slot187_0=GUI.createBlockImages("block_187_0");
slot243_0=GUI.createBlockImages("block_243_0");

//食べ物
slot260_=GUI.createFoodImages("food_260");
slot282_=GUI.createFoodImages("food_282");
slot297_=GUI.createFoodImages("food_297");
slot319_=GUI.createFoodImages("food_319");
slot320_=GUI.createFoodImages("food_320");
slot322_=GUI.createFoodImages("food_322");
slot349_=GUI.createFoodImages("food_349");
slot350_=GUI.createFoodImages("food_350");
slot357_=GUI.createFoodImages("food_357");
slot360_=GUI.createFoodImages("food_360");
slot363_=GUI.createFoodImages("food_363");
slot364_=GUI.createFoodImages("food_364");
slot365_=GUI.createFoodImages("food_365");
slot366_=GUI.createFoodImages("food_366");
slot367_=GUI.createFoodImages("food_367");
slot375_=GUI.createFoodImages("food_375");
slot391_=GUI.createFoodImages("food_391");
slot392_=GUI.createFoodImages("food_392");
slot393_=GUI.createFoodImages("food_393");
slot394_=GUI.createFoodImages("food_394");
slot396_=GUI.createFoodImages("food_396");
slot400_=GUI.createFoodImages("food_400");
slot411_=GUI.createFoodImages("food_411");
slot412_=GUI.createFoodImages("food_412");
slot413_=GUI.createFoodImages("food_413");
slot423_=GUI.createFoodImages("food_423");
slot424_=GUI.createFoodImages("food_424");
slot457_=GUI.createFoodImages("food_457");
slot459_=GUI.createFoodImages("food_459");
slot460_=GUI.createFoodImages("food_460");
slot461_=GUI.createFoodImages("food_461");
slot462_=GUI.createFoodImages("food_462");
slot463_=GUI.createFoodImages("food_463");
slot466_=GUI.createFoodImages("food_466");


//GUI画像
slotimage=GUI.createGuiImages("inventory.png",Width(180),Height(180));
invslotimage=GUI.createGuiImages("inventory.png",Width(145),Height(145));
topbarimage=GUI.createGuiImages("topbar.png",Width(4000),BarHeight());
backgroundimage=GUI.createGuiImages("back.png",Width(4000),Height(4000));
backbuttonimage=GUI.createGuiImages("close.png",Width(100),Height(100));
backbuttonimage_push=GUI.createGuiImages("close_push.png",Width(100),Height(100));
controlbuttonimage=GUI.createGuiImages("button2.png",Width(180),Height(150));
controlbuttonimage_push=GUI.createGuiImages("button2_push.png",Width(180),Height(150));
allbuttonimage=GUI.createGuiImages("button2.png",Width(180),Height(100));
allbuttonimage_push=GUI.createGuiImages("button2_push.png",Width(180),Height(100));
namesetimage=GUI.createGuiImages("button2.png",Width(810),Height(156));
namesetimage_push=GUI.createGuiImages("button2_push.png",Width(810),Height(156));
amountviewimage=GUI.createGuiImages("message_box.png",Width(810),Height(174));
chestbuttonimage=GUI.createGuiImages("button2.png",Width(200),Height(100));
chestbuttonimage_push=GUI.createGuiImages("button2_push.png",Width(200),Height(100));
}

function saveGuiImages(){
//アイテム
saveBitmapPng("slot256_0",slot256_0);
saveBitmapPng("slot257_0",slot257_0);
saveBitmapPng("slot258_0",slot258_0);
saveBitmapPng("slot259_0",slot259_0);
saveBitmapPng("slot261_0",slot261_0);
saveBitmapPng("slot262_0",slot262_0);
saveBitmapPng("slot263_0",slot263_0);
saveBitmapPng("slot263_1",slot263_1);
saveBitmapPng("slot264_0",slot264_0);
saveBitmapPng("slot265_0",slot265_0);
saveBitmapPng("slot266_0",slot266_0);
saveBitmapPng("slot267_0",slot267_0);
saveBitmapPng("slot268_0",slot268_0);
saveBitmapPng("slot269_0",slot269_0);
saveBitmapPng("slot270_0",slot270_0);
saveBitmapPng("slot271_0",slot271_0);
saveBitmapPng("slot272_0",slot272_0);
saveBitmapPng("slot273_0",slot273_0);
saveBitmapPng("slot274_0",slot274_0);
saveBitmapPng("slot275_0",slot275_0);
saveBitmapPng("slot276_0",slot276_0);
saveBitmapPng("slot277_0",slot277_0);
saveBitmapPng("slot278_0",slot278_0);
saveBitmapPng("slot279_0",slot279_0);
saveBitmapPng("slot280_0",slot280_0);
saveBitmapPng("slot281_0",slot281_0);
saveBitmapPng("slot283_0",slot283_0);
saveBitmapPng("slot284_0",slot284_0);
saveBitmapPng("slot285_0",slot285_0);
saveBitmapPng("slot286_0",slot286_0);
saveBitmapPng("slot287_0",slot287_0);
saveBitmapPng("slot288_0",slot288_0);
saveBitmapPng("slot289_0",slot289_0);
saveBitmapPng("slot290_0",slot290_0);
saveBitmapPng("slot291_0",slot291_0);
saveBitmapPng("slot292_0",slot292_0);
saveBitmapPng("slot293_0",slot293_0);
saveBitmapPng("slot294_0",slot294_0);
saveBitmapPng("slot295_0",slot295_0);
saveBitmapPng("slot296_0",slot296_0);
saveBitmapPng("slot302_0",slot302_0);
saveBitmapPng("slot303_0",slot303_0);
saveBitmapPng("slot304_0",slot304_0);
saveBitmapPng("slot305_0",slot305_0);
saveBitmapPng("slot306_0",slot306_0);
saveBitmapPng("slot307_0",slot307_0);
saveBitmapPng("slot308_0",slot308_0);
saveBitmapPng("slot309_0",slot309_0);
saveBitmapPng("slot310_0",slot310_0);
saveBitmapPng("slot311_0",slot311_0);
saveBitmapPng("slot312_0",slot312_0);
saveBitmapPng("slot313_0",slot313_0);
saveBitmapPng("slot314_0",slot314_0);
saveBitmapPng("slot315_0",slot315_0);
saveBitmapPng("slot316_0",slot316_0);
saveBitmapPng("slot317_0",slot317_0);
saveBitmapPng("slot318_0",slot318_0);
saveBitmapPng("slot321_0",slot321_0);
saveBitmapPng("slot322_0",slot322_0);
saveBitmapPng("slot323_0",slot323_0);
saveBitmapPng("slot324_0",slot324_0);
saveBitmapPng("slot325_0",slot325_0);
saveBitmapPng("slot325_1",slot325_1);
saveBitmapPng("slot325_8",slot325_8);
saveBitmapPng("slot325_10",slot325_10);
saveBitmapPng("slot328_0",slot328_0);
saveBitmapPng("slot329_0",slot329_0);
saveBitmapPng("slot330_0",slot330_0);
saveBitmapPng("slot331_0",slot331_0);
saveBitmapPng("slot332_0",slot332_0);
saveBitmapPng("slot333_0",slot333_0);
saveBitmapPng("slot333_1",slot333_1);
saveBitmapPng("slot333_2",slot333_2);
saveBitmapPng("slot333_3",slot333_3);
saveBitmapPng("slot333_4",slot333_4);
saveBitmapPng("slot333_5",slot333_5);
saveBitmapPng("slot334_0",slot334_0);
saveBitmapPng("slot336_0",slot336_0);
saveBitmapPng("slot337_0",slot337_0);
saveBitmapPng("slot338_0",slot338_0);
saveBitmapPng("slot339_0",slot339_0);
saveBitmapPng("slot340_0",slot340_0);
saveBitmapPng("slot341_0",slot341_0);
saveBitmapPng("slot342_0",slot342_0);
saveBitmapPng("slot343_0",slot343_0);
saveBitmapPng("slot344_0",slot344_0);
saveBitmapPng("slot345_0",slot345_0);
saveBitmapPng("slot346_0",slot346_0);
saveBitmapPng("slot347_0",slot347_0);
saveBitmapPng("slot348_0",slot348_0);
saveBitmapPng("slot351_0",slot351_0);
saveBitmapPng("slot351_1",slot351_1);
saveBitmapPng("slot351_2",slot351_2);
saveBitmapPng("slot351_3",slot351_3);
saveBitmapPng("slot351_4",slot351_4);
saveBitmapPng("slot351_5",slot351_5);
saveBitmapPng("slot351_6",slot351_6);
saveBitmapPng("slot351_7",slot351_7);
saveBitmapPng("slot351_8",slot351_8);
saveBitmapPng("slot351_9",slot351_9);
saveBitmapPng("slot351_10",slot351_10);
saveBitmapPng("slot351_11",slot351_11);
saveBitmapPng("slot351_12",slot351_12);
saveBitmapPng("slot351_13",slot351_13);
saveBitmapPng("slot351_14",slot351_14);
saveBitmapPng("slot351_15",slot351_15);
saveBitmapPng("slot352_0",slot352_0);
saveBitmapPng("slot353_0",slot353_0);
saveBitmapPng("slot354_0",slot354_0);
saveBitmapPng("slot355_0",slot355_0);
saveBitmapPng("slot356_9",slot356_9);
saveBitmapPng("slot358_0",slot358_0);
saveBitmapPng("slot359_0",slot359_0);
saveBitmapPng("slot361_0",slot361_0);
saveBitmapPng("slot362_0",slot362_0);
saveBitmapPng("slot368_0",slot368_0);
saveBitmapPng("slot369_0",slot369_0);
saveBitmapPng("slot370_0",slot370_0);
saveBitmapPng("slot371_0",slot371_0);
saveBitmapPng("slot372_0",slot372_0);
saveBitmapPng("slot373_0",slot373_0);
saveBitmapPng("slot374_0",slot374_0);
saveBitmapPng("slot376_0",slot376_0);
saveBitmapPng("slot377_0",slot377_0);
saveBitmapPng("slot378_0",slot378_0);
saveBitmapPng("slot379_0",slot379_0);
saveBitmapPng("slot380_0",slot380_0);
saveBitmapPng("slot381_0",slot381_0);
saveBitmapPng("slot382_0",slot382_0);
saveBitmapPng("slot384_0",slot384_0);
saveBitmapPng("slot385_0",slot385_0);
saveBitmapPng("slot388_0",slot388_0);
saveBitmapPng("slot389_0",slot389_0);
saveBitmapPng("slot390_0",slot390_0);
saveBitmapPng("slot395_0",slot395_0);
saveBitmapPng("slot397_0",slot397_0);
saveBitmapPng("slot397_1",slot397_1);
saveBitmapPng("slot397_2",slot397_2);
saveBitmapPng("slot397_3",slot397_3);
saveBitmapPng("slot397_4",slot397_4);
saveBitmapPng("slot397_5",slot397_5);
saveBitmapPng("slot398_0",slot398_0);
saveBitmapPng("slot399_0",slot399_0);
saveBitmapPng("slot401_0",slot401_0);
saveBitmapPng("slot402_0",slot402_0);
saveBitmapPng("slot403_0",slot403_0);
saveBitmapPng("slot404_0",slot404_0);
saveBitmapPng("slot405_0",slot405_0);
saveBitmapPng("slot406_0",slot406_0);
saveBitmapPng("slot407_0",slot407_0);
saveBitmapPng("slot408_0",slot408_0);
saveBitmapPng("slot409_0",slot409_0);
saveBitmapPng("slot410_0",slot410_0);
saveBitmapPng("slot414_0",slot414_0);
saveBitmapPng("slot415_0",slot415_0);
saveBitmapPng("slot417_0",slot417_0);
saveBitmapPng("slot418_0",slot418_0);
saveBitmapPng("slot419_0",slot419_0);
saveBitmapPng("slot420_0",slot420_0);
saveBitmapPng("slot421_0",slot421_0);
saveBitmapPng("slot422_0",slot422_0);
saveBitmapPng("slot426_0",slot426_0);
saveBitmapPng("slot427_0",slot427_0);
saveBitmapPng("slot428_0",slot428_0);
saveBitmapPng("slot429_0",slot429_0);
saveBitmapPng("slot430_0",slot430_0);
saveBitmapPng("slot431_0",slot431_0);
saveBitmapPng("slot432_0",slot432_0);
saveBitmapPng("slot433_0",slot433_0);
saveBitmapPng("slot437_0",slot437_0);
saveBitmapPng("slot439_0",slot439_0);
saveBitmapPng("slot444_0",slot444_0);
saveBitmapPng("slot444_431",slot444_431);
saveBitmapPng("slot445_0",slot445_0);
saveBitmapPng("slot458_0",slot458_0);
saveBitmapPng("slot2256_0",slot2256_0);
saveBitmapPng("slot2257_0",slot2257_0);
saveBitmapPng("slot2258_0",slot2258_0);
saveBitmapPng("slot2259_0",slot2259_0);
saveBitmapPng("slot2260_0",slot2260_0);
saveBitmapPng("slot2261_0",slot2261_0);
saveBitmapPng("slot2262_0",slot2262_0);
saveBitmapPng("slot2263_0",slot2263_0);
saveBitmapPng("slot2264_0",slot2264_0);
saveBitmapPng("slot2265_0",slot2265_0);
saveBitmapPng("slot2266_0",slot2266_0);
saveBitmapPng("slot2267_0",slot2267_0);

//ブロック
saveBitmapPng("slot1_0",slot1_0);
saveBitmapPng("slot1_1",slot1_1);
saveBitmapPng("slot1_2",slot1_2);
saveBitmapPng("slot1_3",slot1_3);
saveBitmapPng("slot1_4",slot1_4);
saveBitmapPng("slot1_5",slot1_5);
saveBitmapPng("slot1_6",slot1_6);
saveBitmapPng("slot2_0",slot2_0);
saveBitmapPng("slot3_0",slot3_0);
saveBitmapPng("slot4_0",slot4_0);
saveBitmapPng("slot5_0",slot5_0);
saveBitmapPng("slot5_1",slot5_1);
saveBitmapPng("slot5_2",slot5_2);
saveBitmapPng("slot5_3",slot5_3);
saveBitmapPng("slot5_4",slot5_4);
saveBitmapPng("slot5_5",slot5_5);
saveBitmapPng("slot6_0",slot6_0);
saveBitmapPng("slot6_1",slot6_1);
saveBitmapPng("slot6_2",slot6_2);
saveBitmapPng("slot6_3",slot6_3);
saveBitmapPng("slot6_4",slot6_4);
saveBitmapPng("slot6_5",slot6_5);
saveBitmapPng("slot7_0",slot7_0);
saveBitmapPng("slot12_0",slot12_0);
saveBitmapPng("slot12_1",slot12_1);
saveBitmapPng("slot13_0",slot13_0);
saveBitmapPng("slot14_0",slot14_0);
saveBitmapPng("slot15_0",slot15_0);
saveBitmapPng("slot16_0",slot16_0);
saveBitmapPng("slot17_0",slot17_0);
saveBitmapPng("slot17_1",slot17_1);
saveBitmapPng("slot17_2",slot17_2);
saveBitmapPng("slot17_3",slot17_3);
saveBitmapPng("slot18_0",slot18_0);
saveBitmapPng("slot18_1",slot18_1);
saveBitmapPng("slot18_2",slot18_2);
saveBitmapPng("slot18_3",slot18_3);
saveBitmapPng("slot20_0",slot20_0);
saveBitmapPng("slot21_0",slot21_0);
saveBitmapPng("slot22_0",slot22_0);
saveBitmapPng("slot23_0",slot23_0);
saveBitmapPng("slot24_0",slot24_0);
saveBitmapPng("slot24_1",slot24_1);
saveBitmapPng("slot24_2",slot24_2);
saveBitmapPng("slot25_0",slot25_0);
saveBitmapPng("slot29_1",slot29_1);
saveBitmapPng("slot30_0",slot30_0);
saveBitmapPng("slot33_1",slot33_1);
saveBitmapPng("slot35_0",slot35_0);
saveBitmapPng("slot35_1",slot35_1);
saveBitmapPng("slot35_2",slot35_2);
saveBitmapPng("slot35_3",slot35_3);
saveBitmapPng("slot35_4",slot35_4);
saveBitmapPng("slot35_5",slot35_5);
saveBitmapPng("slot35_6",slot35_6);
saveBitmapPng("slot35_7",slot35_7);
saveBitmapPng("slot35_8",slot35_8);
saveBitmapPng("slot35_9",slot35_9);
saveBitmapPng("slot35_10",slot35_10);
saveBitmapPng("slot35_11",slot35_11);
saveBitmapPng("slot35_12",slot35_12);
saveBitmapPng("slot35_13",slot35_13);
saveBitmapPng("slot35_14",slot35_14);
saveBitmapPng("slot35_15",slot35_15);
saveBitmapPng("slot39_0",slot39_0);
saveBitmapPng("slot40_0",slot40_0);
saveBitmapPng("slot41_0",slot41_0);
saveBitmapPng("slot42_0",slot42_0);
saveBitmapPng("slot44_0",slot44_0);
saveBitmapPng("slot44_1",slot44_1);
saveBitmapPng("slot44_3",slot44_3);
saveBitmapPng("slot44_4",slot44_4);
saveBitmapPng("slot44_5",slot44_5);
saveBitmapPng("slot44_6",slot44_6);
saveBitmapPng("slot44_7",slot44_7);
saveBitmapPng("slot45_0",slot45_0);
saveBitmapPng("slot46_0",slot46_0);
saveBitmapPng("slot47_0",slot47_0);
saveBitmapPng("slot48_0",slot48_0);
saveBitmapPng("slot49_0",slot49_0);
saveBitmapPng("slot50_0",slot50_0);
saveBitmapPng("slot53_0",slot53_0);
saveBitmapPng("slot54_0",slot54_0);
saveBitmapPng("slot56_0",slot56_0);
saveBitmapPng("slot57_0",slot57_0);
saveBitmapPng("slot58_0",slot58_0);
saveBitmapPng("slot61_0",slot61_0);
saveBitmapPng("slot65_0",slot65_0);
saveBitmapPng("slot66_0",slot66_0);
saveBitmapPng("slot67_0",slot67_0);
saveBitmapPng("slot69_0",slot69_0);
saveBitmapPng("slot70_0",slot70_0);
saveBitmapPng("slot72_0",slot72_0);
saveBitmapPng("slot73_0",slot73_0);
saveBitmapPng("slot76_0",slot76_0);
saveBitmapPng("slot77_5",slot77_5);
saveBitmapPng("slot78_0",slot78_0);
saveBitmapPng("slot79_0",slot79_0);
saveBitmapPng("slot80_0",slot80_0);
saveBitmapPng("slot81_0",slot81_0);
saveBitmapPng("slot82_0",slot82_0);
saveBitmapPng("slot85_0",slot85_0);
saveBitmapPng("slot85_1",slot85_1);
saveBitmapPng("slot85_2",slot85_2);
saveBitmapPng("slot85_3",slot85_3);
saveBitmapPng("slot85_4",slot85_4);
saveBitmapPng("slot85_5",slot85_5);
saveBitmapPng("slot86_0",slot86_0);
saveBitmapPng("slot87_0",slot87_0);
saveBitmapPng("slot88_0",slot88_0);
saveBitmapPng("slot89_0",slot89_0);
saveBitmapPng("slot91_0",slot91_0);
saveBitmapPng("slot96_0",slot96_0);
saveBitmapPng("slot98_0",slot98_0);
saveBitmapPng("slot98_1",slot98_1);
saveBitmapPng("slot98_2",slot98_2);
saveBitmapPng("slot98_3",slot98_3);
saveBitmapPng("slot101_0",slot101_0);
saveBitmapPng("slot102_0",slot102_0);
saveBitmapPng("slot103_0",slot103_0);
saveBitmapPng("slot106_0",slot106_0);
saveBitmapPng("slot107_0",slot107_0);
saveBitmapPng("slot108_0",slot108_0);
saveBitmapPng("slot109_0",slot109_0);
saveBitmapPng("slot110_0",slot110_0);
saveBitmapPng("slot111_0",slot111_0);
saveBitmapPng("slot112_0",slot112_0);
saveBitmapPng("slot113_0",slot113_0);
saveBitmapPng("slot114_0",slot114_0);
saveBitmapPng("slot116_0",slot116_0);
saveBitmapPng("slot121_0",slot121_0);
saveBitmapPng("slot123_0",slot123_0);
saveBitmapPng("slot125_0",slot125_0);
saveBitmapPng("slot128_0",slot128_0);
saveBitmapPng("slot129_0",slot129_0);
saveBitmapPng("slot131_0",slot131_0);
saveBitmapPng("slot133_0",slot133_0);
saveBitmapPng("slot134_0",slot134_0);
saveBitmapPng("slot135_0",slot135_0);
saveBitmapPng("slot136_0",slot136_0);
saveBitmapPng("slot139_0",slot139_0);
saveBitmapPng("slot139_1",slot139_1);
saveBitmapPng("slot143_5",slot143_5);
saveBitmapPng("slot145_0",slot145_0);
saveBitmapPng("slot147_0",slot147_0);
saveBitmapPng("slot148_0",slot148_0);
saveBitmapPng("slot151_0",slot151_0);
saveBitmapPng("slot152_0",slot152_0);
saveBitmapPng("slot153_0",slot153_0);
saveBitmapPng("slot155_0",slot155_0);
saveBitmapPng("slot155_1",slot155_1);
saveBitmapPng("slot155_2",slot155_2);
saveBitmapPng("slot156_0",slot156_0);
saveBitmapPng("slot158_0",slot158_0);
saveBitmapPng("slot158_1",slot158_1);
saveBitmapPng("slot158_2",slot158_2);
saveBitmapPng("slot158_3",slot158_3);
saveBitmapPng("slot158_4",slot158_4);
saveBitmapPng("slot158_5",slot158_5);
saveBitmapPng("slot159_0",slot159_0);
saveBitmapPng("slot159_1",slot159_1);
saveBitmapPng("slot159_2",slot159_2);
saveBitmapPng("slot159_3",slot159_3);
saveBitmapPng("slot159_4",slot159_4);
saveBitmapPng("slot159_5",slot159_5);
saveBitmapPng("slot159_6",slot159_6);
saveBitmapPng("slot159_7",slot159_7);
saveBitmapPng("slot159_8",slot159_8);
saveBitmapPng("slot159_9",slot159_9);
saveBitmapPng("slot159_10",slot159_10);
saveBitmapPng("slot159_11",slot159_11);
saveBitmapPng("slot159_12",slot159_12);
saveBitmapPng("slot159_13",slot159_13);
saveBitmapPng("slot159_14",slot159_14);
saveBitmapPng("slot159_15",slot159_15);
saveBitmapPng("slot161_0",slot161_0);
saveBitmapPng("slot161_1",slot161_1);
saveBitmapPng("slot162_0",slot162_0);
saveBitmapPng("slot162_1",slot162_1);
saveBitmapPng("slot163_0",slot163_0);
saveBitmapPng("slot164_0",slot164_0);
saveBitmapPng("slot165_0",slot165_0);
saveBitmapPng("slot167_0",slot167_0);
saveBitmapPng("slot171_0",slot171_0);
saveBitmapPng("slot171_1",slot171_1);
saveBitmapPng("slot171_2",slot171_2);
saveBitmapPng("slot171_3",slot171_3);
saveBitmapPng("slot171_4",slot171_4);
saveBitmapPng("slot171_5",slot171_5);
saveBitmapPng("slot171_6",slot171_6);
saveBitmapPng("slot171_7",slot171_7);
saveBitmapPng("slot171_8",slot171_8);
saveBitmapPng("slot171_9",slot171_9);
saveBitmapPng("slot171_10",slot171_10);
saveBitmapPng("slot171_11",slot171_11);
saveBitmapPng("slot171_12",slot171_12);
saveBitmapPng("slot171_13",slot171_13);
saveBitmapPng("slot171_14",slot171_14);
saveBitmapPng("slot171_15",slot171_15);
saveBitmapPng("slot172_0",slot172_0);
saveBitmapPng("slot173_0",slot173_0);
saveBitmapPng("slot174_0",slot174_0);
saveBitmapPng("slot177_0",slot177_0);
saveBitmapPng("slot179_0",slot179_0);
saveBitmapPng("slot179_1",slot179_1);
saveBitmapPng("slot179_2",slot179_2);
saveBitmapPng("slot180_0",slot180_0);
saveBitmapPng("slot182_0",slot182_0);
saveBitmapPng("slot183_0",slot183_0);
saveBitmapPng("slot184_0",slot184_0);
saveBitmapPng("slot185_0",slot185_0);
saveBitmapPng("slot186_0",slot186_0);
saveBitmapPng("slot187_0",slot187_0);
saveBitmapPng("slot243_0",slot243_0);

//食べ物
saveBitmapPng("slot260_",slot260_);
saveBitmapPng("slot282_",slot282_);
saveBitmapPng("slot297_",slot297_);
saveBitmapPng("slot319_",slot319_);
saveBitmapPng("slot320_",slot320_);
saveBitmapPng("slot322_",slot322_);
saveBitmapPng("slot349_",slot349_);
saveBitmapPng("slot350_",slot350_);
saveBitmapPng("slot357_",slot357_);
saveBitmapPng("slot360_",slot360_);
saveBitmapPng("slot363_",slot363_);
saveBitmapPng("slot364_",slot364_);
saveBitmapPng("slot365_",slot365_);
saveBitmapPng("slot366_",slot366_);
saveBitmapPng("slot367_",slot367_);
saveBitmapPng("slot375_",slot375_);
saveBitmapPng("slot391_",slot391_);
saveBitmapPng("slot392_",slot392_);
saveBitmapPng("slot393_",slot393_);
saveBitmapPng("slot394_",slot394_);
saveBitmapPng("slot396_",slot396_);
saveBitmapPng("slot400_",slot400_);
saveBitmapPng("slot411_",slot411_);
saveBitmapPng("slot412_",slot412_);
saveBitmapPng("slot413_",slot413_);
saveBitmapPng("slot423_",slot423_);
saveBitmapPng("slot424_",slot424_);
saveBitmapPng("slot457_",slot457_);
saveBitmapPng("slot459_",slot459_);
saveBitmapPng("slot460_",slot460_);
saveBitmapPng("slot461_",slot461_);
saveBitmapPng("slot462_",slot462_);
saveBitmapPng("slot463_",slot463_);
saveBitmapPng("slot466_",slot466_);

//GUI画像
saveBitmapPng("slotimage",slotimage);
saveBitmapPng("invslotimage",invslotimage);
saveBitmapPng("topbarimage",topbarimage);
saveBitmapPng("backgroundimage",backgroundimage);
saveBitmapPng("backbuttonimage",backbuttonimage);
saveBitmapPng("backbuttonimage_push",backbuttonimage_push);
saveBitmapPng("controlbuttonimage",controlbuttonimage);
saveBitmapPng("controlbuttonimage_push",controlbuttonimage_push);
saveBitmapPng("allbuttonimage",allbuttonimage);
saveBitmapPng("allbuttonimage_push",allbuttonimage_push);
saveBitmapPng("namesetimage",namesetimage);
saveBitmapPng("namesetimage_push",namesetimage_push);
saveBitmapPng("amountviewimage",amountviewimage);
saveBitmapPng("chestbuttonimage",chestbuttonimage);
saveBitmapPng("chestbuttonimage_push",chestbuttonimage_push);
}

function loadGuiImages(){
//アイテム
slot256_0=loadBitmapPng("slot256_0");
slot257_0=loadBitmapPng("slot257_0");
slot258_0=loadBitmapPng("slot258_0");
slot259_0=loadBitmapPng("slot259_0");
slot261_0=loadBitmapPng("slot261_0");
slot262_0=loadBitmapPng("slot262_0");
slot263_0=loadBitmapPng("slot263_0");
slot263_1=loadBitmapPng("slot263_1");
slot264_0=loadBitmapPng("slot264_0");
slot265_0=loadBitmapPng("slot265_0");
slot266_0=loadBitmapPng("slot266_0");
slot267_0=loadBitmapPng("slot267_0");
slot268_0=loadBitmapPng("slot268_0");
slot269_0=loadBitmapPng("slot269_0");
slot270_0=loadBitmapPng("slot270_0");
slot271_0=loadBitmapPng("slot271_0");
slot272_0=loadBitmapPng("slot272_0");
slot273_0=loadBitmapPng("slot273_0");
slot274_0=loadBitmapPng("slot274_0");
slot275_0=loadBitmapPng("slot275_0");
slot276_0=loadBitmapPng("slot276_0");
slot277_0=loadBitmapPng("slot277_0");
slot278_0=loadBitmapPng("slot278_0");
slot279_0=loadBitmapPng("slot279_0");
slot280_0=loadBitmapPng("slot280_0");
slot281_0=loadBitmapPng("slot281_0");
slot283_0=loadBitmapPng("slot283_0");
slot284_0=loadBitmapPng("slot284_0");
slot285_0=loadBitmapPng("slot285_0");
slot286_0=loadBitmapPng("slot286_0");
slot287_0=loadBitmapPng("slot287_0");
slot288_0=loadBitmapPng("slot288_0");
slot289_0=loadBitmapPng("slot289_0");
slot290_0=loadBitmapPng("slot290_0");
slot291_0=loadBitmapPng("slot291_0");
slot292_0=loadBitmapPng("slot292_0");
slot293_0=loadBitmapPng("slot293_0");
slot294_0=loadBitmapPng("slot294_0");
slot295_0=loadBitmapPng("slot295_0");
slot296_0=loadBitmapPng("slot296_0");
slot302_0=loadBitmapPng("slot302_0");
slot303_0=loadBitmapPng("slot303_0");
slot304_0=loadBitmapPng("slot304_0");
slot305_0=loadBitmapPng("slot305_0");
slot306_0=loadBitmapPng("slot306_0");
slot307_0=loadBitmapPng("slot307_0");
slot308_0=loadBitmapPng("slot308_0");
slot309_0=loadBitmapPng("slot309_0");
slot310_0=loadBitmapPng("slot310_0");
slot311_0=loadBitmapPng("slot311_0");
slot312_0=loadBitmapPng("slot312_0");
slot313_0=loadBitmapPng("slot313_0");
slot314_0=loadBitmapPng("slot314_0");
slot315_0=loadBitmapPng("slot315_0");
slot316_0=loadBitmapPng("slot316_0");
slot317_0=loadBitmapPng("slot317_0");
slot318_0=loadBitmapPng("slot318_0");
slot321_0=loadBitmapPng("slot321_0");
slot322_0=loadBitmapPng("slot322_0");
slot323_0=loadBitmapPng("slot323_0");
slot324_0=loadBitmapPng("slot324_0");
slot325_0=loadBitmapPng("slot325_0");
slot325_1=loadBitmapPng("slot325_1");
slot325_8=loadBitmapPng("slot325_8");
slot325_10=loadBitmapPng("slot325_10");
slot328_0=loadBitmapPng("slot328_0");
slot329_0=loadBitmapPng("slot329_0");
slot330_0=loadBitmapPng("slot330_0");
slot331_0=loadBitmapPng("slot331_0");
slot332_0=loadBitmapPng("slot332_0");
slot333_0=loadBitmapPng("slot333_0");
slot333_1=loadBitmapPng("slot333_1");
slot333_2=loadBitmapPng("slot333_2");
slot333_3=loadBitmapPng("slot333_3");
slot333_4=loadBitmapPng("slot333_4");
slot333_5=loadBitmapPng("slot333_5");
slot334_0=loadBitmapPng("slot334_0");
slot336_0=loadBitmapPng("slot336_0");
slot337_0=loadBitmapPng("slot337_0");
slot338_0=loadBitmapPng("slot338_0");
slot339_0=loadBitmapPng("slot339_0");
slot340_0=loadBitmapPng("slot340_0");
slot341_0=loadBitmapPng("slot341_0");
slot342_0=loadBitmapPng("slot342_0");
slot343_0=loadBitmapPng("slot343_0");
slot344_0=loadBitmapPng("slot344_0");
slot345_0=loadBitmapPng("slot345_0");
slot346_0=loadBitmapPng("slot346_0");
slot347_0=loadBitmapPng("slot347_0");
slot348_0=loadBitmapPng("slot348_0");
slot351_0=loadBitmapPng("slot351_0");
slot351_1=loadBitmapPng("slot351_1");
slot351_2=loadBitmapPng("slot351_2");
slot351_3=loadBitmapPng("slot351_3");
slot351_4=loadBitmapPng("slot351_4");
slot351_5=loadBitmapPng("slot351_5");
slot351_6=loadBitmapPng("slot351_6");
slot351_7=loadBitmapPng("slot351_7");
slot351_8=loadBitmapPng("slot351_8");
slot351_9=loadBitmapPng("slot351_9");
slot351_10=loadBitmapPng("slot351_10");
slot351_11=loadBitmapPng("slot351_11");
slot351_12=loadBitmapPng("slot351_12");
slot351_13=loadBitmapPng("slot351_13");
slot351_14=loadBitmapPng("slot351_14");
slot351_15=loadBitmapPng("slot351_15");
slot352_0=loadBitmapPng("slot352_0");
slot353_0=loadBitmapPng("slot353_0");
slot354_0=loadBitmapPng("slot354_0");
slot355_0=loadBitmapPng("slot355_0");
slot356_9=loadBitmapPng("slot356_9");
slot358_0=loadBitmapPng("slot358_0");
slot359_0=loadBitmapPng("slot359_0");
slot361_0=loadBitmapPng("slot361_0");
slot362_0=loadBitmapPng("slot362_0");
slot368_0=loadBitmapPng("slot368_0");
slot369_0=loadBitmapPng("slot369_0");
slot370_0=loadBitmapPng("slot370_0");
slot371_0=loadBitmapPng("slot371_0");
slot372_0=loadBitmapPng("slot372_0");
slot373_0=loadBitmapPng("slot373_0");
slot374_0=loadBitmapPng("slot374_0");
slot376_0=loadBitmapPng("slot376_0");
slot377_0=loadBitmapPng("slot377_0");
slot378_0=loadBitmapPng("slot378_0");
slot379_0=loadBitmapPng("slot379_0");
slot380_0=loadBitmapPng("slot380_0");
slot381_0=loadBitmapPng("slot381_0");
slot382_0=loadBitmapPng("slot382_0");
slot384_0=loadBitmapPng("slot384_0");
slot385_0=loadBitmapPng("slot385_0");
slot388_0=loadBitmapPng("slot388_0");
slot389_0=loadBitmapPng("slot389_0");
slot390_0=loadBitmapPng("slot390_0");
slot395_0=loadBitmapPng("slot395_0");
slot397_0=loadBitmapPng("slot397_0");
slot397_1=loadBitmapPng("slot397_1");
slot397_2=loadBitmapPng("slot397_2");
slot397_3=loadBitmapPng("slot397_3");
slot397_4=loadBitmapPng("slot397_4");
slot397_5=loadBitmapPng("slot397_5");
slot398_0=loadBitmapPng("slot398_0");
slot399_0=loadBitmapPng("slot399_0");
slot401_0=loadBitmapPng("slot401_0");
slot402_0=loadBitmapPng("slot402_0");
slot403_0=loadBitmapPng("slot403_0");
slot404_0=loadBitmapPng("slot404_0");
slot405_0=loadBitmapPng("slot405_0");
slot406_0=loadBitmapPng("slot406_0");
slot407_0=loadBitmapPng("slot407_0");
slot408_0=loadBitmapPng("slot408_0");
slot409_0=loadBitmapPng("slot409_0");
slot410_0=loadBitmapPng("slot410_0");
slot414_0=loadBitmapPng("slot414_0");
slot415_0=loadBitmapPng("slot415_0");
slot417_0=loadBitmapPng("slot417_0");
slot418_0=loadBitmapPng("slot418_0");
slot419_0=loadBitmapPng("slot419_0");
slot420_0=loadBitmapPng("slot420_0");
slot421_0=loadBitmapPng("slot421_0");
slot422_0=loadBitmapPng("slot422_0");
slot426_0=loadBitmapPng("slot426_0");
slot427_0=loadBitmapPng("slot427_0");
slot428_0=loadBitmapPng("slot428_0");
slot429_0=loadBitmapPng("slot429_0");
slot430_0=loadBitmapPng("slot430_0");
slot431_0=loadBitmapPng("slot431_0");
slot432_0=loadBitmapPng("slot432_0");
slot433_0=loadBitmapPng("slot433_0");
slot437_0=loadBitmapPng("slot437_0");
slot439_0=loadBitmapPng("slot439_0");
slot444_0=loadBitmapPng("slot444_0");
slot444_431=loadBitmapPng("slot444_431");
slot445_0=loadBitmapPng("slot445_0");
slot458_0=loadBitmapPng("slot458_0");
slot2256_0=loadBitmapPng("slot2256_0");
slot2257_0=loadBitmapPng("slot2257_0");
slot2258_0=loadBitmapPng("slot2258_0");
slot2259_0=loadBitmapPng("slot2259_0");
slot2260_0=loadBitmapPng("slot2260_0");
slot2261_0=loadBitmapPng("slot2261_0");
slot2262_0=loadBitmapPng("slot2262_0");
slot2263_0=loadBitmapPng("slot2263_0");
slot2264_0=loadBitmapPng("slot2264_0");
slot2265_0=loadBitmapPng("slot2265_0");
slot2266_0=loadBitmapPng("slot2266_0");
slot2267_0=loadBitmapPng("slot2267_0");

//ブロック
slot1_0=loadBitmapPng("slot1_0");
slot1_1=loadBitmapPng("slot1_1");
slot1_2=loadBitmapPng("slot1_2");
slot1_3=loadBitmapPng("slot1_3");
slot1_4=loadBitmapPng("slot1_4");
slot1_5=loadBitmapPng("slot1_5");
slot1_6=loadBitmapPng("slot1_6");
slot2_0=loadBitmapPng("slot2_0");
slot3_0=loadBitmapPng("slot3_0");
slot4_0=loadBitmapPng("slot4_0");
slot5_0=loadBitmapPng("slot5_0");
slot5_1=loadBitmapPng("slot5_1");
slot5_2=loadBitmapPng("slot5_2");
slot5_3=loadBitmapPng("slot5_3");
slot5_4=loadBitmapPng("slot5_4");
slot5_5=loadBitmapPng("slot5_5");
slot6_0=loadBitmapPng("slot6_0");
slot6_1=loadBitmapPng("slot6_1");
slot6_2=loadBitmapPng("slot6_2");
slot6_3=loadBitmapPng("slot6_3");
slot6_4=loadBitmapPng("slot6_4");
slot6_5=loadBitmapPng("slot6_5");
slot7_0=loadBitmapPng("slot7_0");
slot12_0=loadBitmapPng("slot12_0");
slot12_1=loadBitmapPng("slot12_1");
slot13_0=loadBitmapPng("slot13_0");
slot14_0=loadBitmapPng("slot14_0");
slot15_0=loadBitmapPng("slot15_0");
slot16_0=loadBitmapPng("slot16_0");
slot17_0=loadBitmapPng("slot17_0");
slot17_1=loadBitmapPng("slot17_1");
slot17_2=loadBitmapPng("slot17_2");
slot17_3=loadBitmapPng("slot17_3");
slot18_0=loadBitmapPng("slot18_0");
slot18_1=loadBitmapPng("slot18_1");
slot18_2=loadBitmapPng("slot18_2");
slot18_3=loadBitmapPng("slot18_3");
slot20_0=loadBitmapPng("slot20_0");
slot21_0=loadBitmapPng("slot21_0");
slot22_0=loadBitmapPng("slot22_0");
slot23_0=loadBitmapPng("slot23_0");
slot24_0=loadBitmapPng("slot24_0");
slot24_1=loadBitmapPng("slot24_1");
slot24_2=loadBitmapPng("slot24_2");
slot25_0=loadBitmapPng("slot25_0");
slot29_1=loadBitmapPng("slot29_1");
slot30_0=loadBitmapPng("slot30_0");
slot33_1=loadBitmapPng("slot33_1");
slot35_0=loadBitmapPng("slot35_0");
slot35_1=loadBitmapPng("slot35_1");
slot35_2=loadBitmapPng("slot35_2");
slot35_3=loadBitmapPng("slot35_3");
slot35_4=loadBitmapPng("slot35_4");
slot35_5=loadBitmapPng("slot35_5");
slot35_6=loadBitmapPng("slot35_6");
slot35_7=loadBitmapPng("slot35_7");
slot35_8=loadBitmapPng("slot35_8");
slot35_9=loadBitmapPng("slot35_9");
slot35_10=loadBitmapPng("slot35_10");
slot35_11=loadBitmapPng("slot35_11");
slot35_12=loadBitmapPng("slot35_12");
slot35_13=loadBitmapPng("slot35_13");
slot35_14=loadBitmapPng("slot35_14");
slot35_15=loadBitmapPng("slot35_15");
slot39_0=loadBitmapPng("slot39_0");
slot40_0=loadBitmapPng("slot40_0");
slot41_0=loadBitmapPng("slot41_0");
slot42_0=loadBitmapPng("slot42_0");
slot44_0=loadBitmapPng("slot44_0");
slot44_1=loadBitmapPng("slot44_1");
slot44_3=loadBitmapPng("slot44_3");
slot44_4=loadBitmapPng("slot44_4");
slot44_5=loadBitmapPng("slot44_5");
slot44_6=loadBitmapPng("slot44_6");
slot44_7=loadBitmapPng("slot44_7");
slot45_0=loadBitmapPng("slot45_0");
slot46_0=loadBitmapPng("slot46_0");
slot47_0=loadBitmapPng("slot47_0");
slot48_0=loadBitmapPng("slot48_0");
slot49_0=loadBitmapPng("slot49_0");
slot50_0=loadBitmapPng("slot50_0");
slot53_0=loadBitmapPng("slot53_0");
slot54_0=loadBitmapPng("slot54_0");
slot56_0=loadBitmapPng("slot56_0");
slot57_0=loadBitmapPng("slot57_0");
slot58_0=loadBitmapPng("slot58_0");
slot61_0=loadBitmapPng("slot61_0");
slot65_0=loadBitmapPng("slot65_0");
slot66_0=loadBitmapPng("slot66_0");
slot67_0=loadBitmapPng("slot67_0");
slot69_0=loadBitmapPng("slot69_0");
slot70_0=loadBitmapPng("slot70_0");
slot72_0=loadBitmapPng("slot72_0");
slot73_0=loadBitmapPng("slot73_0");
slot76_0=loadBitmapPng("slot76_0");
slot77_5=loadBitmapPng("slot77_5");
slot78_0=loadBitmapPng("slot78_0");
slot79_0=loadBitmapPng("slot79_0");
slot80_0=loadBitmapPng("slot80_0");
slot81_0=loadBitmapPng("slot81_0");
slot82_0=loadBitmapPng("slot82_0");
slot85_0=loadBitmapPng("slot85_0");
slot85_1=loadBitmapPng("slot85_1");
slot85_2=loadBitmapPng("slot85_2");
slot85_3=loadBitmapPng("slot85_3");
slot85_4=loadBitmapPng("slot85_4");
slot85_5=loadBitmapPng("slot85_5");
slot86_0=loadBitmapPng("slot86_0");
slot87_0=loadBitmapPng("slot87_0");
slot88_0=loadBitmapPng("slot88_0");
slot89_0=loadBitmapPng("slot89_0");
slot91_0=loadBitmapPng("slot91_0");
slot96_0=loadBitmapPng("slot96_0");
slot98_0=loadBitmapPng("slot98_0");
slot98_1=loadBitmapPng("slot98_1");
slot98_2=loadBitmapPng("slot98_2");
slot98_3=loadBitmapPng("slot98_3");
slot101_0=loadBitmapPng("slot101_0");
slot102_0=loadBitmapPng("slot102_0");
slot103_0=loadBitmapPng("slot103_0");
slot106_0=loadBitmapPng("slot106_0");
slot107_0=loadBitmapPng("slot107_0");
slot108_0=loadBitmapPng("slot108_0");
slot109_0=loadBitmapPng("slot109_0");
slot110_0=loadBitmapPng("slot110_0");
slot111_0=loadBitmapPng("slot111_0");
slot112_0=loadBitmapPng("slot112_0");
slot113_0=loadBitmapPng("slot113_0");
slot114_0=loadBitmapPng("slot114_0");
slot116_0=loadBitmapPng("slot116_0");
slot121_0=loadBitmapPng("slot121_0");
slot123_0=loadBitmapPng("slot123_0");
slot125_0=loadBitmapPng("slot125_0");
slot128_0=loadBitmapPng("slot128_0");
slot129_0=loadBitmapPng("slot129_0");
slot131_0=loadBitmapPng("slot131_0");
slot133_0=loadBitmapPng("slot133_0");
slot134_0=loadBitmapPng("slot134_0");
slot135_0=loadBitmapPng("slot135_0");
slot136_0=loadBitmapPng("slot136_0");
slot139_0=loadBitmapPng("slot139_0");
slot139_1=loadBitmapPng("slot139_1");
slot143_5=loadBitmapPng("slot143_5");
slot145_0=loadBitmapPng("slot145_0");
slot147_0=loadBitmapPng("slot147_0");
slot148_0=loadBitmapPng("slot148_0");
slot151_0=loadBitmapPng("slot151_0");
slot152_0=loadBitmapPng("slot152_0");
slot153_0=loadBitmapPng("slot153_0");
slot155_0=loadBitmapPng("slot155_0");
slot155_1=loadBitmapPng("slot155_1");
slot155_2=loadBitmapPng("slot155_2");
slot156_0=loadBitmapPng("slot156_0");
slot158_0=loadBitmapPng("slot158_0");
slot158_1=loadBitmapPng("slot158_1");
slot158_2=loadBitmapPng("slot158_2");
slot158_3=loadBitmapPng("slot158_3");
slot158_4=loadBitmapPng("slot158_4");
slot158_5=loadBitmapPng("slot158_5");
slot159_0=loadBitmapPng("slot159_0");
slot159_1=loadBitmapPng("slot159_1");
slot159_2=loadBitmapPng("slot159_2");
slot159_3=loadBitmapPng("slot159_3");
slot159_4=loadBitmapPng("slot159_4");
slot159_5=loadBitmapPng("slot159_5");
slot159_6=loadBitmapPng("slot159_6");
slot159_7=loadBitmapPng("slot159_7");
slot159_8=loadBitmapPng("slot159_8");
slot159_9=loadBitmapPng("slot159_9");
slot159_10=loadBitmapPng("slot159_10");
slot159_11=loadBitmapPng("slot159_11");
slot159_12=loadBitmapPng("slot159_12");
slot159_13=loadBitmapPng("slot159_13");
slot159_14=loadBitmapPng("slot159_14");
slot159_15=loadBitmapPng("slot159_15");
slot161_0=loadBitmapPng("slot161_0");
slot161_1=loadBitmapPng("slot161_1");
slot162_0=loadBitmapPng("slot162_0");
slot162_1=loadBitmapPng("slot162_1");
slot163_0=loadBitmapPng("slot163_0");
slot164_0=loadBitmapPng("slot164_0");
slot165_0=loadBitmapPng("slot165_0");
slot167_0=loadBitmapPng("slot167_0");
slot171_0=loadBitmapPng("slot171_0");
slot171_1=loadBitmapPng("slot171_1");
slot171_2=loadBitmapPng("slot171_2");
slot171_3=loadBitmapPng("slot171_3");
slot171_4=loadBitmapPng("slot171_4");
slot171_5=loadBitmapPng("slot171_5");
slot171_6=loadBitmapPng("slot171_6");
slot171_7=loadBitmapPng("slot171_7");
slot171_8=loadBitmapPng("slot171_8");
slot171_9=loadBitmapPng("slot171_9");
slot171_10=loadBitmapPng("slot171_10");
slot171_11=loadBitmapPng("slot171_11");
slot171_12=loadBitmapPng("slot171_12");
slot171_13=loadBitmapPng("slot171_13");
slot171_14=loadBitmapPng("slot171_14");
slot171_15=loadBitmapPng("slot171_15");
slot172_0=loadBitmapPng("slot172_0");
slot173_0=loadBitmapPng("slot173_0");
slot174_0=loadBitmapPng("slot174_0");
slot177_0=loadBitmapPng("slot177_0");
slot179_0=loadBitmapPng("slot179_0");
slot179_1=loadBitmapPng("slot179_1");
slot179_2=loadBitmapPng("slot179_2");
slot180_0=loadBitmapPng("slot180_0");
slot182_0=loadBitmapPng("slot182_0");
slot183_0=loadBitmapPng("slot183_0");
slot184_0=loadBitmapPng("slot184_0");
slot185_0=loadBitmapPng("slot185_0");
slot186_0=loadBitmapPng("slot186_0");
slot187_0=loadBitmapPng("slot187_0");
slot243_0=loadBitmapPng("slot243_0");

//食べ物
slot260_=loadBitmapPng("slot260_");
slot282_=loadBitmapPng("slot282_");
slot297_=loadBitmapPng("slot297_");
slot319_=loadBitmapPng("slot319_");
slot320_=loadBitmapPng("slot320_");
slot322_=loadBitmapPng("slot322_");
slot349_=loadBitmapPng("slot349_");
slot350_=loadBitmapPng("slot350_");
slot357_=loadBitmapPng("slot357_");
slot360_=loadBitmapPng("slot360_");
slot363_=loadBitmapPng("slot363_");
slot364_=loadBitmapPng("slot364_");
slot365_=loadBitmapPng("slot365_");
slot366_=loadBitmapPng("slot366_");
slot367_=loadBitmapPng("slot367_");
slot375_=loadBitmapPng("slot375_");
slot391_=loadBitmapPng("slot391_");
slot392_=loadBitmapPng("slot392_");
slot393_=loadBitmapPng("slot393_");
slot394_=loadBitmapPng("slot394_");
slot396_=loadBitmapPng("slot396_");
slot400_=loadBitmapPng("slot400_");
slot411_=loadBitmapPng("slot411_");
slot412_=loadBitmapPng("slot412_");
slot413_=loadBitmapPng("slot413_");
slot423_=loadBitmapPng("slot423_");
slot424_=loadBitmapPng("slot424_");
slot457_=loadBitmapPng("slot457_");
slot459_=loadBitmapPng("slot459_");
slot460_=loadBitmapPng("slot460_");
slot461_=loadBitmapPng("slot461_");
slot462_=loadBitmapPng("slot462_");
slot463_=loadBitmapPng("slot463_");
slot466_=loadBitmapPng("slot466_");

//GUI画像
slotimage=loadBitmapPng("slotimage");
invslotimage=loadBitmapPng("invslotimage");
topbarimage=loadBitmapPng("topbarimage");
backgroundimage=loadBitmapPng("backgroundimage");
backbuttonimage=loadBitmapPng("backbuttonimage");
backbuttonimage_push=loadBitmapPng("backbuttonimage_push");
controlbuttonimage=loadBitmapPng("controlbuttonimage");
controlbuttonimage_push=loadBitmapPng("controlbuttonimage_push");
allbuttonimage=loadBitmapPng("allbuttonimage");
allbuttonimage_push=loadBitmapPng("allbuttonimage_push");
namesetimage=loadBitmapPng("namesetimage");
namesetimage_push=loadBitmapPng("namesetimage_push");
amountviewimage=loadBitmapPng("amountviewimage");
chestbuttonimage=loadBitmapPng("chestbuttonimage");
chestbuttonimage_push=loadBitmapPng("chestbuttonimage_push");
}

function isItem(idinfo){
	if(idinfo==256||idinfo==257||idinfo==258||idinfo==259||idinfo==261||idinfo==262||idinfo==263||idinfo==263||idinfo==264||idinfo==265||idinfo==266||idinfo==267||idinfo==268||idinfo==269||idinfo==270||idinfo==271||idinfo==272||idinfo==273||idinfo==274||idinfo==275||idinfo==276||idinfo==277||idinfo==278||idinfo==279||idinfo==280||idinfo==281||idinfo==283||idinfo==284||idinfo==285||idinfo==286||idinfo==287||idinfo==288||idinfo==289||idinfo==290||idinfo==291||idinfo==292||idinfo==293||idinfo==294||idinfo==295||idinfo==296||idinfo==302||idinfo==303||idinfo==304||idinfo==305||idinfo==306||idinfo==307||idinfo==308||idinfo==309||idinfo==310||idinfo==311||idinfo==312||idinfo==313||idinfo==314||idinfo==315||idinfo==316||idinfo==317||idinfo==318||idinfo==321||idinfo==322||idinfo==323||idinfo==324||idinfo==325||idinfo==325||idinfo==325||idinfo==325||idinfo==328||idinfo==329||idinfo==330||idinfo==331||idinfo==332||idinfo==333||idinfo==333||idinfo==333||idinfo==333||idinfo==333||idinfo==333||idinfo==334||idinfo==336||idinfo==337||idinfo==338||idinfo==339||idinfo==340||idinfo==341||idinfo==342||idinfo==343||idinfo==344||idinfo==345||idinfo==346||idinfo==347||idinfo==348||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==351||idinfo==352||idinfo==353||idinfo==354||idinfo==355||idinfo==356||idinfo==358||idinfo==359||idinfo==361||idinfo==362||idinfo==368||idinfo==369||idinfo==370||idinfo==371||idinfo==372||idinfo==373||idinfo==374||idinfo==376||idinfo==377||idinfo==378||idinfo==379||idinfo==380||idinfo==381||idinfo==382||idinfo==384||idinfo==385||idinfo==388||idinfo==389||idinfo==390||idinfo==395||idinfo==397||idinfo==397||idinfo==397||idinfo==397||idinfo==397||idinfo==397||idinfo==398||idinfo==399||idinfo==401||idinfo==402||idinfo==403||idinfo==404||idinfo==405||idinfo==406||idinfo==407||idinfo==408||idinfo==409||idinfo==410||idinfo==414||idinfo==415||idinfo==417||idinfo==418||idinfo==419||idinfo==420||idinfo==421||idinfo==422||idinfo==426||idinfo==427||idinfo==428||idinfo==429||idinfo==430||idinfo==431||idinfo==432||idinfo==433||idinfo==437||idinfo==439||idinfo==444||idinfo==444||idinfo==445||idinfo==458||idinfo==2256||idinfo==2257||idinfo==2258||idinfo==2259||idinfo==2260||idinfo==2261||idinfo==2262||idinfo==2263||idinfo==2264||idinfo==2265||idinfo==2266||idinfo==2267){
		return true;
	}else{
		return false;
	}
}

function isBlock(idinfo){
	if(idinfo==1||idinfo==1||idinfo==1||idinfo==1||idinfo==1||idinfo==1||idinfo==1||idinfo==2||idinfo==3||idinfo==4||idinfo==5||idinfo==5||idinfo==5||idinfo==5||idinfo==5||idinfo==5||idinfo==6||idinfo==6||idinfo==6||idinfo==6||idinfo==6||idinfo==6||idinfo==7||idinfo==12||idinfo==12||idinfo==13||idinfo==14||idinfo==15||idinfo==16||idinfo==17||idinfo==17||idinfo==17||idinfo==17||idinfo==18||idinfo==18||idinfo==18||idinfo==18||idinfo==20||idinfo==21||idinfo==22||idinfo==23||idinfo==24||idinfo==24||idinfo==24||idinfo==25||idinfo==29||idinfo==30||idinfo==33||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==35||idinfo==39||idinfo==40||idinfo==41||idinfo==42||idinfo==44||idinfo==44||idinfo==44||idinfo==44||idinfo==44||idinfo==44||idinfo==44||idinfo==45||idinfo==46||idinfo==47||idinfo==48||idinfo==49||idinfo==50||idinfo==53||idinfo==54||idinfo==56||idinfo==57||idinfo==58||idinfo==61||idinfo==65||idinfo==66||idinfo==67||idinfo==69||idinfo==70||idinfo==72||idinfo==73||idinfo==76||idinfo==77||idinfo==78||idinfo==79||idinfo==80||idinfo==81||idinfo==82||idinfo==85||idinfo==85||idinfo==85||idinfo==85||idinfo==85||idinfo==85||idinfo==86||idinfo==87||idinfo==88||idinfo==89||idinfo==91||idinfo==96||idinfo==98||idinfo==98||idinfo==98||idinfo==98||idinfo==101||idinfo==102||idinfo==103||idinfo==106||idinfo==107||idinfo==108||idinfo==109||idinfo==110||idinfo==111||idinfo==112||idinfo==113||idinfo==114||idinfo==116||idinfo==121||idinfo==123||idinfo==125||idinfo==128||idinfo==129||idinfo==131||idinfo==133||idinfo==134||idinfo==135||idinfo==136||idinfo==139||idinfo==139||idinfo==143||idinfo==145||idinfo==147||idinfo==148||idinfo==151||idinfo==152||idinfo==153||idinfo==155||idinfo==155||idinfo==155||idinfo==156||idinfo==158||idinfo==158||idinfo==158||idinfo==158||idinfo==158||idinfo==158||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==159||idinfo==161||idinfo==161||idinfo==162||idinfo==162||idinfo==163||idinfo==164||idinfo==165||idinfo==167||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==171||idinfo==172||idinfo==173||idinfo==174||idinfo==177||idinfo==179||idinfo==179||idinfo==179||idinfo==180||idinfo==182||idinfo==183||idinfo==184||idinfo==185||idinfo==186||idinfo==187||idinfo==243){
		return true;
	}else{
		return false;
	}
}

function isFood(idinfo){
	if(idinfo==349||idinfo==260||idinfo==461||idinfo==462||idinfo==363||idinfo==319||idinfo==423||idinfo==411||idinfo==365||idinfo==460||idinfo==391||idinfo==392||idinfo==457||idinfo==360||idinfo==350||idinfo==466||idinfo==364||idinfo==320||idinfo==366||idinfo==424||idinfo==412||idinfo==393||idinfo==322||idinfo==463||idinfo==396||idinfo==357||idinfo==282||idinfo==413||idinfo==459||idinfo==400||idinfo==367||idinfo==375||idinfo==394||idinfo==297){
		return true;
	}else{
		return false;
	}
}
