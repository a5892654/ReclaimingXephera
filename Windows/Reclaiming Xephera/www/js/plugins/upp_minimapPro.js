/*:
 * @plugindesc A minimap for your games.
 * @author William Ramsey (TheUnproPro)
 *
 * @param Minimap X
 * @desc X location of the minimap
 * @default 12
 *
 * @param Minimap Y
 * @desc Y location of the minimap
 * @default 12
 *
 * @param Use Region Drawing
 * @desc Enable region drawing by default
 * @default true
 *
 * @param Border
 * @desc Draw a border around the minimap
 * @default false
 *
 * @param Border Padding
 * @desc Padding of the border
 * @default 8
 *
 * @param Default Impassable Color
 * @desc Default color of impassable tiles
 * @default rgb(25, 125, 230)
 *
 * @param Default Passable Color
 * @desc Default color of passable tiles
 * @default rgb(50, 150, 255)
 *
 * @param Passable Outline
 * @desc Outline the passable tiles
 * @default true
 *
 * @param Passable Outline Color
 * @desc Default color of passable tiles
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Player Color
 * @desc Default player indicator color
 * @default rgba(255, 255, 50, 0.8);
 *
 * @param Event Color
 * @desc Default event indicator color
 * @default rgba(50, 255, 255, 0.8);
 *
 * @param Player Uses Circle Drawing
 * @desc Display player indicator as a circle
 * @default true
 *
 * @param Events Use Circle Drawing
 * @desc Display event indicator as a circle
 * @default true
 *
 * @param Edge Bump
 * @desc Use this to bump the minimap away from screen if it goes out of screen.
 * @default 12
 *
 * @help
 * There are several things you can do with this minimap plugin.
 *
 * Edge Bump - Edge bumping will happen if the minimap goes off screen. It'll
 * fix its location so that its not off screen, plus push its self a bit further
 * based on what you set edge bump to be. Use this if you want to have your
 * minimap anywhere but the top left.
 *
 * Map Properties Notetags:
 * <addMinimap: size> where size is how large you want the minimap to be. this
 * command is important to getting your minimap to display.
 *
 * <mmLocName:Area Name> will display the area name.
 *
 * <region*id*Color:color> where *id* is the region id you want to have as
 * a specific color displayed on the minimap. Leave blank for none.
 * Colors: rgb(r, g, b), rgba(r, g, b, a), or hex colors will work.
 *
 * <unlockMap:true> will force unlock the map upon load. By default, the
 * minimap is hidden.
 *
 * Event Notetags:
 *
 * <mmIcon:iconName> - iconName should be replaced with the name of a
 * picture in your pictures folder. It'll display that picture in the
 * location of the event.
 *
 * <mmShow:true> - this is needed to actually show the event on the minimap.
 *
 * <floatSpeed:0.02> - replace 0.02 with how fast you want the icon to float
 * on the minimap.
 *
 * <floatPower:2> - Replace 2 with how far you want the icon to float.
 *
 * <mmColor:Color> - replace Color with rgb(r,g,b), rgba(r,g,b,a), or a hex
 * color. Example: <mColor:rgba(0, 0, 0, 0.5)>
 *
 * PLUGIN COMMANDS:
 *
 * hideMinimap true/false will show or hide the minimap (rather its unlocked
 * or not.)
 *
 * changeIcon eventId pictureFile where eventId is the event icon you want to
 * change, and pictureFile is the file in the pictures folder you want to use.
 * Example: changeIcon 1 testIcon
 * Note: I can't seem to save this information to the games save file, because
 * it says stack too deep. I'll try to find a way around this later O:
 *
 * unlockMap true/false will unlock the map for that area. This gets saved to
 * the games save file so you only have to do it once.
 *
 * hideMinimapName true/false will determine if the minimap name is hidden
 * or not.
 *
 */
( function() {
  if(typeof $upp === 'undefined' || !$upp) {
    var f = confirm("You don't seem to have a version of upp_core. Click Ok to download it now.");
    if(f == true) {
      var current=window;
  		var open=window.open("https://drive.google.com/file/d/0B0BQK1ikmkf4dFR6b2pXUzI1TzA/view?usp=sharing", "_blank");
  		open.focus();
    }
  }
  $upp.requireVersion(1.01);
  var params = PluginManager.parameters("upp_minimapPro");
  var vars = {
    unlocked: [],
    unlocked2: [],
    mapHidden: false,
    icons: []
  };

  $upp.vars.mmx = Number(params['Minimap X']);
  $upp.vars.mmy = Number(params['Minimap Y']);
  $upp.vars.border = params['Border'];
  $upp.vars.borderPadding = Number(params['Border Padding']);
  $upp.vars.borderColor = params['Border Color'];
  $upp.vars.impassColor = params['Default Impassable Color'];
  $upp.vars.passColor = params['Default Passable Color'];
  $upp.vars.outlineColor = params['Passable Outline Color'];
  $upp.vars.pColor = params['Player Color'];
  $upp.vars.eColor = params['Event Color'];
  $upp.vars.playerCircle = params['Player Uses Circle Drawing'];
  $upp.vars.eventCircle = params['Events Use Circle Drawing'];
  $upp.vars.mmData = [];
  $upp.vars.useRegionDrawing = params['Use Region Drawing'];
  $upp.vars.edgeBump = Number(params['Edge Bump']);

  vars.mmx = $upp.vars.mmx;
  vars.mmy = $upp.vars.mmy;
  vars.border = $upp.vars.border;
  vars.borderPadding = $upp.vars.borderPadding;
  vars.borderColor = $upp.vars.borderColor;
  vars.impassColor = $upp.vars.impassColor;
  vars.passColor = $upp.vars.passColor;
  vars.outlineColor = $upp.vars.outlineColor;
  vars.pColor = $upp.vars.pColor;
  vars.eColor = $upp.vars.eColor;
  vars.playerCircle = $upp.vars.playerCircle;
  vars.eventCircle = $upp.vars.eventCircle;
  vars.mmData = $upp.vars.mmData;
  vars.useRegionDrawing = $upp.vars.useRegionDrawing;
  vars.edgeBump = $upp.vars.edgeBump;

  vars.regionData = {
    color: []
  }

  var upp_miniMapCmds = Game_Interpreter.prototype.pluginCommand
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
  	upp_miniMapCmds.apply(this);

    if(command == "hideMinimap"){
      switch(args[0]){
        case "true":
        vars.miniMap.hide();
        vars.miniMapBorder.hide();
        vars.miniMapName.hide();
        vars.miniMapOverlay.hide();
        vars.miniMapIndicators.hide();
        vars.mapHidden = true;
        break;
        case "false":
        vars.miniMap.show();
        vars.miniMapBorder.show();
        if($dataMap.meta.mmLocName){
          vars.miniMapName.show();
        }
        vars.miniMapOverlay.show();
        vars.miniMapIndicators.show();
        vars.mapHidden = false;
        break;
      }
    }

    if(command=="changeIcon"){
      for(i=0;i<$dataMap.events.length;i++){
        if(vars.icons[$gameMap._mapId].info[i]){
          if(vars.icons[$gameMap._mapId].info[i].id == args[0]){
          vars.icons[$gameMap._mapId].info[i].bitmap.bitmap = ImageManager.loadPicture(args[1]);
          }
        }
      }
    }

    if(command=="unlockMap"){
      $upp.vars.mapData.mapLoaded[$gameMap._mapId] = eval(args[0]);
      vars.miniMap.show();
      vars.miniMapBorder.show();
      if($dataMap.meta.mmLocName){
        vars.miniMapName.show();
      }
      vars.miniMapOverlay.show();
      vars.miniMapIndicators.show();
      vars.mapHidden = false;
    }
    if(command=="hideMinimapName"){
      switch(args[0]){
        case "true":
        vars.miniMapName.hide();
        break;
        case "false":
        if($dataMap.meta.mmLocName){
          vars.miniMapName.show();
        }
        break;
      }
    }
  }

  function Minimap_Display() { this.initialize.apply(this); }
  Minimap_Display.prototype = Object.create(Sprite_Base.prototype);
  Minimap_Display.prototype.constructor = Minimap_Display;

  Minimap_Display.prototype.initialize = function(){
    Sprite_Base.prototype.initialize.call(this);
    if(vars.mapHidden == true || vars.unlocked[$gameMap._mapId] != true || vars.unlocked2[$gameMap._mapId] != true)
    {
      this.hide();
    }
    this.loaded = false;
  }

  Minimap_Display.prototype.update = function(){
    this.x=vars.mmx;
    this.y=vars.mmy;
    this.width = $dataMap.width;
    this.height = $dataMap.height;
    this.scale.x = Number($dataMap.meta.addMinimap);
    this.scale.y = Number($dataMap.meta.addMinimap);
    if(this.x+(this.width*this.scale.x)>Graphics.boxWidth){
      this.x=Graphics.boxWidth-(this.width*this.scale.x)-vars.edgeBump;
    }
    if(this.y+(this.height*this.scale.y)>Graphics.boxHeight){
      this.y=Graphics.boxHeight-(this.height*this.scale.y)-vars.edgeBump;
    }
    if(this.loaded == false){
      this.bitmap = new Bitmap($dataMap.width, $dataMap.height);
      this.bitmap.fillRect(0, 0, this.width, this.height, vars.passColor);
      for(i=0;i<vars.mmData[$gameMap._mapId].tile.length;i++){
        this.bitmap.clearRect(vars.mmData[$gameMap._mapId].tile[i].x, vars.mmData[$gameMap._mapId].tile[i].y, 1, 1);
        this.bitmap.fillRect(vars.mmData[$gameMap._mapId].tile[i].x, vars.mmData[$gameMap._mapId].tile[i].y, 1, 1, vars.impassColor);
      }

      if(vars.useRegionDrawing == "true"){
        for(i=0;i<$dataMap.width;i++){
          for(i2=0;i2<$dataMap.height;i2++){
            this.bitmap.fillRect(i, i2, 1, 1, vars.regionData.color[$gameMap.regionId(i, i2)])
            //console.log(vars.regionData.color[$gameMap.regionId(i, i2)])
          }
        }
      }

      this.loaded = true;
    }
  }

  function Minimap_Overlay() { this.initialize.apply(this); }
  Minimap_Overlay.prototype = Object.create(Sprite_Base.prototype);
  Minimap_Overlay.prototype.constructor = Minimap_Overlay;

  Minimap_Overlay.prototype.initialize = function(){
    Sprite_Base.prototype.initialize.call(this);
    if(vars.mapHidden == true || vars.unlocked[$gameMap._mapId] != true || vars.unlocked2[$gameMap._mapId] != true)
    {
      this.hide();
    }
    this.loaded = false;
  }

  Minimap_Overlay.prototype.update = function(){
    this.x=vars.mmx;
    this.y=vars.mmy;
    this.width = $dataMap.width * Number($dataMap.meta.addMinimap);
    this.height = $dataMap.height * Number($dataMap.meta.addMinimap);
    if(this.x+this.width>Graphics.boxWidth){
      this.x=Graphics.boxWidth-this.width-vars.edgeBump;
    }
    if(this.y+this.height>Graphics.boxHeight){
      this.y=Graphics.boxHeight-this.height-vars.edgeBump;
    }
    if(this.loaded == false){
      this.bitmap = new Bitmap(this.width, this.height);
      for(i=0;i<vars.mmData[$gameMap._mapId].tile.length;i++){
        if($gameMap.checkPassage(vars.mmData[$gameMap._mapId].tile[i].x-1, vars.mmData[$gameMap._mapId].tile[i].y, 0x0F) == true){
          this.bitmap.fillRect(vars.mmData[$gameMap._mapId].tile[i].x*Number($dataMap.meta.addMinimap)-1, vars.mmData[$gameMap._mapId].tile[i].y*Number($dataMap.meta.addMinimap), 1, Number($dataMap.meta.addMinimap), vars.outlineColor);
        }
        if($gameMap.checkPassage(vars.mmData[$gameMap._mapId].tile[i].x, vars.mmData[$gameMap._mapId].tile[i].y-1, 0x0F) == true){
          this.bitmap.fillRect(vars.mmData[$gameMap._mapId].tile[i].x*Number($dataMap.meta.addMinimap), vars.mmData[$gameMap._mapId].tile[i].y*Number($dataMap.meta.addMinimap)-1, Number($dataMap.meta.addMinimap), 1, vars.outlineColor);
        }
        if($gameMap.checkPassage(vars.mmData[$gameMap._mapId].tile[i].x+1, vars.mmData[$gameMap._mapId].tile[i].y, 0x0F) == true){
          this.bitmap.fillRect(vars.mmData[$gameMap._mapId].tile[i].x*Number($dataMap.meta.addMinimap)+Number($dataMap.meta.addMinimap), vars.mmData[$gameMap._mapId].tile[i].y*Number($dataMap.meta.addMinimap), 1, Number($dataMap.meta.addMinimap), vars.outlineColor);
        }
        if($gameMap.checkPassage(vars.mmData[$gameMap._mapId].tile[i].x, vars.mmData[$gameMap._mapId].tile[i].y+1, 0x0F) == true){
          this.bitmap.fillRect(vars.mmData[$gameMap._mapId].tile[i].x*Number($dataMap.meta.addMinimap), vars.mmData[$gameMap._mapId].tile[i].y*Number($dataMap.meta.addMinimap)+Number($dataMap.meta.addMinimap), Number($dataMap.meta.addMinimap), 1, vars.outlineColor);
        }
      }
      this.loaded = true;
    }
  }

  function Minimap_Indicators() { this.initialize.apply(this); }
  Minimap_Indicators.prototype = Object.create(Sprite_Base.prototype);
  Minimap_Indicators.prototype.constructor = Minimap_Indicators;

  Minimap_Indicators.prototype.initialize = function(){
    Sprite_Base.prototype.initialize.call(this);
    if(vars.mapHidden == true || vars.unlocked[$gameMap._mapId] != true || vars.unlocked2[$gameMap._mapId] != true)
    {
      this.hide();
    }
    this.loaded = false;
  }

  Minimap_Indicators.prototype.update = function(){
    this.x=vars.mmx;
    this.y=vars.mmy;
    this.width = $dataMap.width * Number($dataMap.meta.addMinimap);
    this.height = $dataMap.height * Number($dataMap.meta.addMinimap);
    if(this.x+this.width>Graphics.boxWidth){
      this.x=Graphics.boxWidth-this.width-vars.edgeBump;
    }
    if(this.y+this.height>Graphics.boxHeight){
      this.y=Graphics.boxHeight-this.height-vars.edgeBump;
    }
    if(this.loaded == false){
      this.bitmap = new Bitmap(this.width, this.height);
      this.loaded = true;
    }
    this.bitmap.clear();

    for(i=0;i<vars.icons[$gameMap._mapId].info.length;i++){
      if(vars.icons[$gameMap._mapId].info[i].icon == null){
        switch(vars.eventCircle){
          case "true":
          this.bitmap.drawCircle(vars.icons[$gameMap._mapId].info[i]._event.x*Number($dataMap.meta.addMinimap)+Number($dataMap.meta.addMinimap)/2, vars.icons[$gameMap._mapId].info[i]._event.y*Number($dataMap.meta.addMinimap)+Number($dataMap.meta.addMinimap)/2, Number($dataMap.meta.addMinimap)/2, vars.icons[$gameMap._mapId].info[i].color);
          break;
          case "false":
          this.bitmap.fillRect(vars.icons[$gameMap._mapId].info[i]._event.x*Number($dataMap.meta.addMinimap), vars.icons[$gameMap._mapId].info[i]._event.y*Number($dataMap.meta.addMinimap), Number($dataMap.meta.addMinimap), Number($dataMap.meta.addMinimap), vars.icons[$gameMap._mapId].info[i].color);
          break;
        }
      } else {
        if(vars.allowIcons != false){
          if(vars.icons[$gameMap._mapId].info[i].bitmap == null){
            vars.icons[$gameMap._mapId].info[i].bitmap = new Sprite();
            vars.icons[$gameMap._mapId].info[i].bitmap.bitmap = ImageManager.loadPicture(vars.icons[$gameMap._mapId].info[i].icon);
            this.addChild(vars.icons[$gameMap._mapId].info[i].bitmap)
          }
          vars.icons[$gameMap._mapId].info[i].bitmap.x = vars.icons[$gameMap._mapId].info[i]._event.x*Number($dataMap.meta.addMinimap) - vars.icons[$gameMap._mapId].info[i].bitmap.width/2;
          vars.icons[$gameMap._mapId].info[i].bitmap.y = vars.icons[$gameMap._mapId].info[i]._event.y*Number($dataMap.meta.addMinimap) - vars.icons[$gameMap._mapId].info[i].bitmap.height/2;
          vars.icons[$gameMap._mapId].info[i].bitmap.y+=Math.sin(vars.icons[$gameMap._mapId].info[i].fv)*Number(vars.icons[$gameMap._mapId].info[i].fvPower);
          vars.icons[$gameMap._mapId].info[i].fv += Number(vars.icons[$gameMap._mapId].info[i].fvSpeed);
        }
      }
    }
    switch(vars.playerCircle){
      case "true":
        this.bitmap.drawCircle($gamePlayer.x*Number($dataMap.meta.addMinimap)+(Number($dataMap.meta.addMinimap)/2), $gamePlayer.y*Number($dataMap.meta.addMinimap)+(Number($dataMap.meta.addMinimap)/2), Number($dataMap.meta.addMinimap)/2, vars.pColor);
      break;
      case "false":
        this.bitmap.fillRect($gamePlayer.x*Number($dataMap.meta.addMinimap), $gamePlayer.y*Number($dataMap.meta.addMinimap), Number($dataMap.meta.addMinimap), Number($dataMap.meta.addMinimap), vars.pColor);
      break;
    }
  }

  function Minimap_Name() { this.initialize.apply(this); }
  Minimap_Name.prototype = Object.create(Window_Base.prototype);
  Minimap_Name.prototype.constructor = Minimap_Name;

  Minimap_Name.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    if(vars.mapHidden == true || vars.unlocked[$gameMap._mapId] != true || vars.unlocked2[$gameMap._mapId] != true)
    {
      this.hide();
    }
    this.refresh();
  }

  Minimap_Name.prototype.refresh = function(){
    this.width = $dataMap.width * Number($dataMap.meta.addMinimap);
    this.height = this.fittingHeight(1);
    this.x=vars.mmx;
    this.y=$dataMap.height * Number($dataMap.meta.addMinimap) +  Number(vars.mmy) + Number(vars.borderPadding)/2;
    if(this.x+this.width>Graphics.boxWidth){
      this.x=Graphics.boxWidth-this.width-vars.edgeBump;
    }

    if(this.y+this.height>Graphics.boxHeight){
      this.y = vars.mmy - this.height - ($dataMap.height * Number($dataMap.meta.addMinimap)) - (vars.borderPadding*2);
    }
    this.createContents();
    this.contents.drawText($dataMap.meta.mmLocName, 0, 0, this.contents.width, this.lineHeight(), 'center')
  }

  function Minimap_Border() { this.initialize.apply(this); }
  Minimap_Border.prototype = Object.create(Window_Base.prototype);
  Minimap_Border.prototype.constructor = Minimap_Border;

  Minimap_Border.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    if(vars.mapHidden == true || vars.unlocked[$gameMap._mapId] != true || vars.border == "false" || vars.unlocked2[$gameMap._mapId] != true)
    {
      this.hide();
    }
    this.backOpacity = 0;
    this.refresh();
  }

  Minimap_Border.prototype.refresh = function(){
    this.width = $dataMap.width * Number($dataMap.meta.addMinimap) + Number(vars.borderPadding);
    this.height = $dataMap.height * Number($dataMap.meta.addMinimap) + Number(vars.borderPadding);
    this.x=vars.mmx - Number(vars.borderPadding)/2;
    this.y=vars.mmy -  Number(vars.borderPadding)/2;
    if(this.x+this.width>Graphics.boxWidth){
      this.x=Graphics.boxWidth-this.width-vars.edgeBump+vars.borderPadding/2;
    }
    if(this.y+this.height>Graphics.boxHeight){
      this.y=Graphics.boxHeight-this.height-vars.edgeBump+vars.borderPadding/2;
    }
  }

  var mmAl = Scene_Map.prototype.start
  Scene_Map.prototype.start = function(){
    mmAl.call(this);
    vars.icons[$gameMap._mapId] = {
      info: []
    }
    if(vars.unlocked[$gameMap._mapId] != true) {
      vars.mmData[$gameMap._mapId] = {
        tile: []
      };

      for(i=0;i<$dataMap.width;i++){
        for(i2=0;i2<$dataMap.height;i2++){
          if($gameMap.checkPassage(i, i2, 0x0F) == false) {
            vars.mmData[$gameMap._mapId].tile.push({
              x: i,
              y: i2
            });
          }
        }
      }
      vars.unlocked[$gameMap._mapId] = true;
    }

      for(i=0;i<$dataMap.events.length;i++){
        if($dataMap.events[i]){
          if($dataMap.events[i].meta.mmShow == "true"){
            vars.icons[$gameMap._mapId].info.push({
              icon: $dataMap.events[i].meta.mmIcon || null,
              _event: $gameMap._events[i],
              hidden: $dataMap.events[i].meta.mmHidden || false,
              color: $dataMap.events[i].meta.mmColor || vars.eColor,
              bitmap: null,
              id: $gameMap._events[i].eventId(),
              fv: 0.0,
              fvSpeed: $dataMap.events[i].meta.floatSpeed || 0,
              fvPower: $dataMap.events[i].meta.floatPower || 0
            })
          }
        }
      }

    for(i=0;i<256;i++){
      vars.regionData.color[i] = eval("$dataMap.meta.region"+i+"Color") || "rgba(0, 0, 0, 0)";
    }
    this.makeMinimap();
  }

  Scene_Map.prototype.makeMinimap = function(){
    if($dataMap.meta.addMinimap){
      this.miniMap = new Minimap_Display();
      this.miniMapOverlay = new Minimap_Overlay();
      this.miniMapIndicators = new Minimap_Indicators();
      this.miniMapName = new Minimap_Name();
      this.miniMapBorder = new Minimap_Border();
      vars.miniMap = this.miniMap;
      vars.miniMapOverlay = this.miniMapOverlay;
      vars.miniMapIndicators = this.miniMapIndicators;
      vars.miniMapName = this.miniMapName;
      vars.miniMapBorder = this.miniMapBorder;
      this.addChild(this.miniMap);
      this.addChild(this.miniMapOverlay);
      this.addChild(this.miniMapIndicators);
      this.addChild(this.miniMapName);
      this.addChild(this.miniMapBorder);
      this.setChildIndex(this.miniMap, 1);
      this.setChildIndex(this.miniMapOverlay, 2);
      this.setChildIndex(this.miniMapIndicators, 3);
      this.setChildIndex(this.miniMapName, 4);
      this.setChildIndex(this.miniMapBorder, 5);
      if($dataMap.meta.unlockMap == "true"){
        $upp.vars.mapData.mapLoaded[$gameMap._mapId] = true;
      }
      if($upp.vars.mapData.mapLoaded[$gameMap._mapId] == true){
        this.miniMap.show();
        this.miniMapOverlay.show();
        this.miniMapIndicators.show();
        if($dataMap.meta.mmLocName){
          this.miniMapName.show();
        }
        this.miniMapBorder.show();
      } else {
        this.miniMap.hide();
        this.miniMapOverlay.hide();
        this.miniMapIndicators.hide();
        this.miniMapName.hide();
        this.miniMapBorder.hide();
      }
    }
  }
})();
