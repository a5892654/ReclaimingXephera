//=============================================================================
// Tree-type Skill Learning System
// FTKR_SkillTreeSystem.js
// Author     : Futokoro "フトコロ"
// Created     : 2017/02/25
// Last Updated : 2017/06/05
// Version : v1.7.6
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_STS = true;

var FTKR = FTKR || {};
FTKR.STS = FTKR.STS || {};

//=============================================================================
/*:
 * @plugindesc v1.7.6 Tree-type Skill Learning System
 * @author Futokoro
 *
 * @param --(Required)--
 * 
 * @param Skill Tree Id
 * @desc Set the weapon type ID with the skill tree set.
 * @default 1
 * 
 * @param --Basic--
 * 
 * @param Show Skill Command
 * @desc Display for Skill Acqusition command on the menu
 *  1 - Show, 0 - Hide
 * @default 1
 *
 * @param Command Name
 * @desc Command name of the Skill Acquisition event.
 * @default Skill Tree
 *
 * @param Skill Menu Switch ID
 * @desc Specify the switch ID that controls the ON/OFF display of the menu column display.
 * @default 0
 *
 * @param Enable Confirmation
 * @desc Enable the execution on the confirmation screen at skill acquisition?
 *  1 - Enable, 0 - Disable
 * @default 1
 *
 * @param Reset When Forgotten Skill
 * @desc Choose whether or not to reset the tree when forgetting skills.
 * 1 - Reset, 0 - Don't reset
 * @default 1
 * 
 * @param Learned Actor Var ID
 * @desc Specify the variable that stores the ID of the actor who acquired the skill.
 * @default 0
 *
 * @param Learned Skill Var ID
 * @desc Specify the variable ID that stores the ID of the skill learned.
 * @default 0
 *
 * @param --Learned Count--
 * 
 * @param Enabled Skill Count
 * @desc Choose whether or not to enable the skill acquisition function multiple times.
 * 1 - Enable, 0 - Disable
 * @default 0
 * 
 * @param Default Max Count
 * @desc Set the maximum amount a skill can be acquired
 * @default 1
 * 
 * @param Skill Learned Icon
 * @desc Set the skill learned icon ID:
 * @default 87
 * 
 * @param --Skill Point--
 * 
 * @param SP Display Name
 * @desc Skill point display name.
 * @default SP
 * 
 * @param Default Required SP
 * @desc Set the skill points required to learn.
 * (Default value is 1)
 * @default 1
 * 
 * @param Get Level Up Sp
 * @desc Set SP gained when leveling up.
 * (Default value is 1)
 * @default 1
 * 
 * @param Cost Sp Icon
 * @desc Specify the icon ID displayed for SP cost.
 * @default 296
 *
 * @param Hide Sp Cost 0
 * @desc Choose whether or not to hide the SP cost window when the SP cost = 0
 * 0 - Show, 1 - Hide
 * @default 0
 * 
 * @param Display Get Sp
 * @desc Choose to display SP gained at the end of battle
 * %1 - Get the SP amount, %2 - Skill Point name
 * @default Earned %1 of %2!
 * 
 * @param --Skill Frame--
 * 
 * @param Enabled Skill Frame
 * @desc CHoose whether or not to display the skill frame.
 * 1 - Show, 0 - Hide
 * @default 1
 * 
 * @param Skill Frame Width
 * @desc Width of skill frame
 * @default 40
 * 
 * @param Skill Frame Height
 * @desc Height of skill frame
 * @default 40
 * 
 * @param Skill Icon Offset X
 * @desc Relative position of the X coordinate of the icon from the skill frame.
 * @default 4
 * 
 * @param Skill Icon Offset Y
 * @desc Relative position of the Y coordinate of the icon from the skill frame.
 * @default 4
 * 
 * @param --Skill Text--
 * 
 * @param Skill Name Format
 * @desc Skill name display contents
 * %1 - Skill name
 * @default (Skill name)
 * 
 * @param Skill Text Offset X
 * @desc Relative position of the X coordinate of the skill name to the skill frame.
 * @default 38
 * 
 * @param Skill Text Offset Y
 * @desc Relative position of the Y coordinate of the skill name to the skill frame.
 * @default 2
 * 
 * @param --Skill Frame Color--
 * 
 * @param Frame Color isLearned
 * @desc The frame color of a mastered skill.
 * @default 0
 * 
 * @param Frame Color isLearn OK
 * @desc The frame color of a learning skill.
 * @default 17
 * 
 * @param Frame Color isReqSkill NG
 * @desc The frame color of an unlearned skill.
 * @default 15
 * 
 * @param Frame Color isRequired NG
 * @desc Border color of skill while not having enough Skill Points.
 * @default 16
 * 
 * @param --Skill Count Frame Settings--
 * 
 * @param Draw Count Frame
 * @desc Choose to display skill count frame.
 * 1 - Show, 0 - Hide
 * @default 0
 * 
 * @param Count Frame Width
 * @desc Skill count frame wdith.
 * @default 20
 * 
 * @param Count Frame Height
 * @desc The skill count frame width.
 * @default 20
 * 
 * @param Count Frame Thick
 * @desc Set the border thickness.
 * @default 2
 * 
 * @param Count Frame Offset X
 * @desc The relative position of the X coordinate of the count frame from the skill frame.
 * (The default value is -10, but 10 is also recommended when counting)
 * @default -10
 * 
 * @param Count Frame Offset Y
 * @desc The relative position of the Y coordinate of the count frame from the skill frame.
 * (The default value is 25, but 0 is also recommended when counting)
 * @default 25
 * 
 * @param Count Frame Format
 * @desc Display contents of the skill count in the count frame.
 * %1 - Skill count value
 * @default \}\c[0]%1\{
 * 
 * @param Skill Count Offset X
 * @desc The relative position of the X coordinate of the skill count from the count frame.
 * @default 5
 * 
 * @param Skill Count Offset Y
 * @desc The relative position of the Y coordinate of the skill count from the count frame.
 * @default -10
 * 
 * @param --Skill Tree Layout Settings--
 * 
 * @param Draw Line Type
 * @desc How the lines are drawn between the skills of the tree.
 * 0 - Straight, 1 - Key Line(A), 2 - Key Line(B)
 * @default 1
 * 
 * @param Tree Line Thick
 * @desc Define the line thickness of the tree.
 * @default 2
 * 
 * @param Add Frame To Line
 * @desc Whether or not to add a black border to the tree line.
 * 1 - Enable, 0 - Disable
 * @default 0
 * 
 * @param Fit Line Color To Frame
 * @desc Whether ot not to match the line color between skill with the frame color.
 * 1 - Enable, 0 - Disable
 * @default 1
 * 
 * @param --Skill Tree Window--
 * @default 
 *
 * @param Skill Tree Max Cols
 * @desc (?)Number of columns (Skills per row) (スキルを横に並べられる数).
 * @default 5
 * 
 * @param Skill Tree Height Space
 * @desc Skill tree vertical height spacing.
 * @default 24
 * 
 * @param --Skill Status Window--
 * @default 
 * 
 * @param Skill Status Title Format
 * @desc Define the display contents of the title with a character string.
 * %1 - Actor Name, %2 - Skill Name
 * @default \c[16][%2] Skill info
 * 
 * @param Adjust Skill Desc Width
 * @desc (?)Choose whether or not text fits automatically within the window.
 * 0 - Disabled, 1 - Enabled
 * @default 0
 * 
 * @param --Cost Window--
 * @default 
 *
 * @param Cost Title Format
 * @desc Define the text of the Learn Cost variable.
 * @default \c[16]Learn cost:
 *
 * @param Cost Item Format
 * @desc Define the character string for the Cost Name (Default is recommended).
 *  %1 - Cost Name
 * @default %1
 *
 * @param Cost Number Format
 * @desc Define the display contents of the cost number with 'color,character string'.
 *  %1 - Cost Number, %2 - (?)Total Cost
 * @default 17,%1(%2)
 *
 * @param Cost Number Width
 * @desc Specify the width of the display with the cost number (by pixel unit).
 * 0 - No specification
 * @default 0
 *
 * @param --Pre Skill Window--
 * @default 
 *
 * @param Preskill Title Format
 * @desc For prerequisite skills, describe the skill title with a character string.
 * @default \c[16]Prerequisite Skills:
 *
 * @param Preskill Item Format
 * @desc For prerequisite skills, describe the content of the skill with a character string.
 *  %1 - Prereq skill name
 * @default %1
 *
 * @param --Confirmation Window--
 * @default 
 *
 * @param Conf Title Format
 * @desc Define the text of the skill confirm command.
 *  %1 - Actor Name, %2 - Skill name
 * @default Confirm skill acquisition?
 * 
 * @param Confirmation Ok Format
 * @desc Define the display contents of the confirmation verification command.
 * @default Yes
 *
 * @param Confirmation Cancel Format
 * @desc Define the display contents of the confirmation rejection command.
 * @default No
 *
 * @param --Learned SE--
 * @default 
 * 
 * @param Learn SE Name
 * @desc Specify the name of the SE to play when learning skills.
 * @default Sound2
 *
 * @param Learn SE Volume
 * @desc Specify the sound volume of the SE to be played when learning skills.
 * @default 90
 *
 * @param Learn SE Pitch
 * @desc Specify the pitch of the SE played when learning skills.
 * @default 100
 *
 * @param Learn SE Pan
 * @desc Specify the panning of the SE to be played when learning a skill.
 * @default 0
 *
 * @param --Cost Icon--
 * @default 
 * 
 * @param Cost Gold Icon
 * @desc Choose an icon to display for cost when it is currency.
 * @default 297
 *
 * @param Cost Variables Icon
 * @desc  Choose an icon to display for cost when
 * @default 294
 *
 * @param --Actor Status Layout--
 * @desc To enable these parameters, FTKR_CustomSimpleActorStatus.js is required.
 * 
 * @param Actor Status Text1
 * @desc Set the Actor status for Text1.
 * See help for details
 * @default face
 * 
 * @param Actor Status Text2
 * @desc Set the status display for Text2.
 * See help for details
 * @default name,level,sp
 * 
 * @param Actor Status Text3
 * @desc Set the status display for Text3.
 * See help for details
 * @default 
 * 
 * @param Actor Status Space
 * @desc Define the interval of the text.
 * @default 0,0,0,0
 * 
 * @param Actor Status Space In Text
 * @desc Define the interval for dispalying multiple images.
 * @default 0
 * 
 * @param Actor Status Width Rate
 * @desc Define the ratio of the display's width of Text1 and Text3
 * See help for details
 * @default 3,2,0
 *
 * @param Display Face Scale
 * @desc Set the scaling of the actor's face portait.
 * (The standard is 4)
 * @default 3
 * 
 * @param --Frame Setting--
 * @desc To enable these parameters, FTKR_DisplayCommandFrame.js is required.
 * 
 * @param Skill Frame Type
 * @desc Set the display type of the skill frame.
 * 0 - Hide, 1 ~ 7 - Help reference
 * @default 1
 * 
 * @param Count Frame Type
 * @desc (?)Sets the skill count type.
 * 0 - Hide, 1 ~ 7 - Help reference
 * @default 1
 * 
 * @param Default Frame Image Index
 * @desc Set the image number to use for the skill count box
 * <Count Frame Type> (Set it from 3 ~ 5)
 * @default 
 * 
 * @param Display Tree Type Frame
 * @desc Choose whether or not to display a frame on the tree type.
 * 0 - Do not display, 1 - Display
 * @default 0
 * 
 * @help
 * Translated from Japanese! If anyone could iron out certain text with a better translation, 
 * especially the text with (?) at the beginning of some sentences, that would be greatly appreciated! - NotTheReal, 6/7/17
 * To quickly jump to any questionably translated lines, try ctrl+F then entering "(?)".
 *-----------------------------------------------------------------------------
 * Overview
 *-----------------------------------------------------------------------------
 * This plug-in implements a tree-type skill learning system.
 *
 * 1.With this plug-in, a dedicated screen for a skill learning system is  
 *   displayed for the player, and they can learn skills visually.
 * 
 *   The screen can be displayed via the following:
 *   a. When the plug-in parameter <Show Skill Command> is set to 1
 *   b. When <STS Open> or <STS skill tree screen display> is executed.
 * 
 * 
 * 2.For each actor, implement a skill point (SP) that can be used when acquiring skills.
 * 
 * 
 * For details on how to use the plugin, please refer to the following hyperlink.
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_SkillTreeSystem.ja.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * PluginManager Settings
 *-----------------------------------------------------------------------------
 * 1. In the plugin parameter <Skill Tree Id>, Set weapon type ID for
 *    skill tree.
 * 
 * 
 * 2. If you want to change the Actor Status Layout,
 *    FTKR_CustomSimpleActorStatus.js is required.
 * 
 * 
 * 3. If you want to change the Skill Frame Type and more,
 *    FTKR_DisplayCommandFrame.js is required.
 * 
 * 
 *-----------------------------------------------------------------------------
 * Set Skill Acquisition Screen 
 *-----------------------------------------------------------------------------
 * You can call the Skill Acquisition screen via the following:
 * 
 * 1. Call through the menu.
 * By using the plug-in parameter <Show Skill Command> settings
 * Enabling it's display
 * 
 * The command name can be defined with <Command Name>
 * By registering the ID number in <Skill Menu Switch ID>, you can display the menu
 * It can be controlled with a switch.
 * 
 *  
 * 2. A call through the plugin command.
 * You can display the screen with the following plugin commands.
 * <STS Open>
 * <STS skill tree screen display>
 * 
 * 
 * [Other settings]
 * <Enable Confirmation>
 *     :You can set whether or not to enter a confirmation screen when skill acquisition is executed.
 * 
 * <Reset When Forgotten Skill>
 *	:Sets whether or not to reset the tree when a skill is deleted.
 *	:If you do not reset this, you can master the derived skills even if you delete skills.
 *	:However, deleted skills are displayed by item or plug-in command
 *	:You can not re-master unless you reset the entire tree.
 * 
 * 
 *-----------------------------------------------------------------------------
 * Skill Tree Settings
 *-----------------------------------------------------------------------------
 * In order to use the tree type skill learning system, skill tree setting is necessary.
 *
 * [Register Skill Tree ID]
 * To create a skill tree, first create a skill tree type in "Weapon type". 
 * If we attach a weapon type name as "skill tree" etc, 
 * I think that it becomes easier to understand.
 * 
 * **********************************************************************
 * After setting the ID for the skill tree, add it to the plugin parameter <Skill Tree Id>
 * Be sure to register that ID.
 * **********************************************************************
 * 
 * [Creating a skill tree]
 * Create skill trees in the weapon database;
 * For the weapon type, select the skill tree ID registered earlier;
 * The name of weapon is the name of skill tree, the weapon icon is skill tree icon;
 * it will be displayed on the screen.
 * The ID of the created weapon will be the tree type ID described later.
 * 
 * The skill tree is set with the following note tags:
 * 
 * <Set Sts Data>
 * code
 * </Set Sts Data>
 * 
 * [code Items that can be used]
 * skill: x1,x2,...
 * skill: x1,x2,...
 *    :(?)The skill that becomes the starting point of the skill tree, IDs x 1, x 2, ... (スキルツリーの起点となるスキルとして、ID x1,x2,...を);
 *    :By registering multiple IDs, you have multiple origins;
 *    :(?)It can be a tree. (ツリーにすることができます。);
 *    :If you enter '0' instead of the ID, that part will be displayed in the tree instead;
 *    :(?)It will be blank (空欄になります。);
 *    :The number of which the origin skill ID (including 0) can be registered is dependant on the plug-in parameters;
 *    :It is up to the set value of <Skill Tree Max Cols>.
 * 
 * required: eval
 * Acquisition condition: Conditional expression
 *    :Set the learning condition of the skill tree to the conditional expression (eval);
 *    :If this condition isn't met, this skill tree will not be displayed on the screen.
 * 
 * image index: y
 * Frame image number: y
 *    :Set the display number of the frame image described later to y.
 * 
 * image index on cursor: y
 * Cursor frame image number: y
 *    :Set the display number of the frame image when overlapping the cursor described later to y.
 * 
 * [About the value of conditional expression (eval)]
 * (?)In the conditional expression (eval), by entering the JS calculation formula as the damage calculation formula; (条件式(eval)部は、ダメージ計算式のように、JS計算式を入力することで)
 * Values ​​other than fixed values ​​can be used. The following code can be used;
 *  a.param - Refer to the parameters of the user. (Attack power of the user with a.atk)
 *  s[x]    - Refers to the state of switch ID x.
 *  v[x]    - Reference value of variable ID x.
 * 
 * 
 *-----------------------------------------------------------------------------
 * Derived Skill Settings
 *-----------------------------------------------------------------------------
 * After creating the skill tree, set the skills that make up the tree.
 * For each skill that makes up the tree, enter the following note tags:
 * <Set Sts Data>
 * code
 * </Set Sts Data>
 * 
 * [Items that can be used for code]
 * skill: y1,y2,...
 * skill: y1,y2,...
 * tree x skill: y1,y2,...
 * tree x skill: y1,y2,...
 *    :(?)As a skill derived from that skill, skill ID y1, y2, ...(そのスキルから派生するスキルとして、スキルID y1,y2,...を);
 *    :(?)If tree X is added, for skill tree ID X (登録します。tree x を加えた場合は、スキルツリーID x に対する);
 *    :Register as a derivative;
 *    :Tree 0 skill: y1, y2, ..., and skill: y1, y2, ... share the same meaning.
 *    :(?)Furthermore, multiple skills are to be derived from the same skill (なお、複数のスキルから同じスキルに派生するように);
 *    :(?)If you set, you must learn all the skills of the derivation source (設定した場合、派生元のスキルをすべて習得しなければ、その派生);
 *    :Skills cannot be acquired.
 * 
 * (Example)
 * 1.Register skill C in the derivative skill of skill A
 * 2.(?)Create skill C in skill B derivation skill (スキルBの派生スキルにスキルCを登録)
 * (?)⇒ In this case, to acquire Skill C, both Skill A and Skill B(⇒この場合、スキルCを習得するために、スキルAとスキルBをどちらも);
 * (?) 習得しなければいけない
 * 
 * position: y(, z)
 * display position: y(, z)
 *    :Set the display position of the skill to the Y line.
 *    :By adding the z coordinate, shift the display to the right by z blank spaces.
 *    :Notice that the display position in the horizontal direction is not the z-th column.
 * 
 * show: eval
 * Display condition: eval
 *	:Set skill display condition to eval.
 *	:If this eval is not met, this skill will not be displayed on the screen.
 *	:Also skills that derive only from this skill are not displayed.
 * 
 * required: eval
 * Learning condition: eval
 *	:Set skill acquisition condition to eval.
 *	:If you do not fulfill this eval, you acquire the prerequisite skills of this skill,
 *	:Even if it meets the necessary cost, it can not be learned.
 * 
 * cost sp: eval
 * Cost SP: eval
 *	:Set SP necessary for learning to eval.
 * cost item[x]: eval
 * Cost item [x]: eval
 *	:Set item ID x required for acquisition to eval.
 * cost weapon[x]: eval
 * Cost Weapon [x]: eval
 *	:Weapon ID x required for learning is set to eval.
 * cost armor[x]: eval
 * Cost Protector [x]: eval
 *	:Set the armor ID x required for acquisition to eval.
 * cost v[x]: eval
 * Cost v [x]: eval
 *	:Set the value of variable ID x required for learning to eval.
 * cost gold: eval
 * Cost money: eval
 *	:We will set the money required for learning to eval.
 * 
 * max count: y
 * Maximum Number of Acquisitions: y
 *	:Set the maximum acquisition number to y.
 * image index: y
 * Frame image number: y
 *	:Set the skill frame image display number to y. (* 1)
 * image index on cursor: y
 * Cursor frame image number: y
 *	:Set the display number of the skill frame image when overlapping with the cursor to y. (* 1)
 * 
 * (* 1) In order to enable these tags, FTKR_DisplayCommandFrame.js
 *     Is required. Also, set <Skill Frame Type> to any one of 3 to 5
 *     it is necessary.
 * 
 * 
 * [About the value of eval]
 * 
 * For the eval, values ​​other than the fixed value can be used by 
 * entering the calculation formula like the damage calculation formula (eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を).
 * The following code can be used;
 * A.param - Refer to the user's parameters. (Attack power of the user with a.atk)
 * S [x] - Refers to the state of switch ID x.
 * V [x] - Reference the value of the variable ID x.
 * 
 * 
 * [Notes on creation of the skill tree]
 * You can not duplicate the same skill in one skill tree.
 * If skills are duplicated, register one closer to the end of the tree.
 * 
 * The number of skills (including blanks) that can be displayed on the same line is determined by plug-in parameters;
 * It is up to the set value of <Skill Tree Max Cols>.
 * 
 * 
 *-----------------------------------------------------------------------------
 * Actor / Class Setting
 *------------------------------------------------------------------- ------------------------------
 * The created skill tree has the following note tags in the actor, or class
 * You can use it by entering it.
 * 
 * <Set Sts Data>
 * code
 * </Set Sts Data>
 * 
 * [Items that can be used for code]
 * TreeType: x1, x2, ...
 * Tree type: x1, x2, ...
 *	:The actor or class has tree type ID x 1, x 2, ...
 *	:Can be used.
 *	:Tree type ID is the ID of the weapon created as a tree.
 * 
 * Init Sp: x
 * Initial SP: x
 *	:Set the initial SP of the actor to x.
 * 
 * 
 * You can add or delete skill trees with the following plugin command.
 * 
 * <STS ADD TreeType (x) Actor (y)>
 * <STS additional tree type (x) actor (y)>
 *	:Add tree type ID 'x' to actor ID 'y'.
 * 
 * <STS REDUCE TreeType(x) Actor(y)>
 * <STS delete tree type (x) actor (y)>
 *	:Delete tree type ID 'x' of actor ID 'y'.
 *	:However, tree type initialized with the above tag can not be deleted.
 * 
 * 
 *-----------------------------------------------------------------------------
 * Skill Point Settings
 *-----------------------------------------------------------------------------
 * As a cost to learn skills, we have prepared a parameter called Skill Point exclusively for this plug-in.
 * 
 * Skill points are available at level up.
 * You can set the amount of acquisition with the following plugin parameters.
 * 
 * <Get Level Up Sp: eval>
 *	:Set the acquisition SP at level up with eval.
 * 
 * [About the value of eval]
 * In the eval part, values ​​other than the fixed value can be used by entering the calculation formula like the damage calculation formula. 
 * The following code can be used;
 *  a.param - Refer to the parameters of the user. (Attack power of the user with a.atk)
 *  s[x]    - Refers to the state of switch ID x.
 *  v[x]    - Reference value of variable ID x.
 * 
 * 
 *-----------------------------------------------------------------------------
 * Acquiring Skill Points
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンド(Plugin Command)で、SPを取得できます。
 * 
 * <STS Add Sp(x) Actor(y)>
 * <STS 加算 Sp(x) アクター(y)>
 *    :アクターID'y'に、SPを'x'加算する。
 *    :'x'および'y'には、'v[n]'とすることでゲーム内変数ID'n'の値を
 *    :指定できます。
 * 例)
 * <STS Add Sp(v[1]) Actor(2)>
 * <STS 加算 Sp(v[1]) アクター(2)>
 *    :アクター2が、変数ID1に格納した値の分、SPを取得する。
 * 
 * 
 * 以下のタグをアイテム(Item)のメモ欄に設定できます。
 * <STS Get Sp: x>
 * <STS SP 入手: x>
 *    :対象が、SPを'x'取得する。
 * 
 * 
 * 以下のタグをエネミー(Enemy)のメモ欄に設定できます。
 * <STS Get Sp: x>
 * <STS SP 入手: x>
 *    :設定したエネミーを倒すと、SPを'x'取得する。
 *    :取得したSPは、戦闘終了時に経験値や金と一緒にメッセージを表示します。
 *    :表示内容は、プラグインパラメータ<Display Get Sp>で設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルツリータイプの枠表示設定
 *-----------------------------------------------------------------------------
 * FTKR_DisplayCommandFrame.js がある場合、スキルツリータイプに枠を
 * 表示できます。
 * 
 * 以下のプラグインパラメータで有効にできます。
 * 
 * <Enabled Tree Type Frame>
 *    :枠表示を有効にするか設定します。
 *    :0 - 無効, 1 - 有効
 * 
 * 表示タイプなどの設定は、FTKR_DisplayCommandFrame.js の設定に従います。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルツリーのスキル表示の設定
 *-----------------------------------------------------------------------------
 * スキルツリーウィンドウ上でのスキルの表示内容を設定します。
 * 
 * スキルの表示は、以下の部位で構成します。
 * 1.スキル枠
 * 2.スキルアイコン
 * 3.スキルテキスト
 * 4.スキル習得回数
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキル枠の設定
 *-----------------------------------------------------------------------------
 * スキル枠には、以下の3種類の項目があります。
 * 以下のプラグインパラメータで設定を変えることができます。
 * 
 * 1. スキル枠サイズ
 * 以下スキル表示の基礎となる枠のサイズで、スキルツリーウィンドウの
 * カーソルサイズでもあります。
 * <Skill Frame Width>
 *    :枠の幅
 * <Skill Frame Height>
 *    :枠の高さ
 * 
 * 
 * 2. スキル枠線色
 * スキルの習得状況を線色で表すことができます。
 * 以下のプラグインパラメータで、それぞれの色を設定できます。
 * <Frame Color isLearned>
 *    :習得済みスキル
 * <Frame Color isLearn OK>
 *    :習得可能なスキル
 * <Frame Color isReqSkill NG>
 *    :必要スキル未修得のスキル
 * <Frame Color isRequired NG>
 *    :必要コストまたはパラメータ不足のスキル
 * 
 * 
 * 3. スキル枠の表示設定
 * 以下のプラグインパラメータで、枠を表示できます。
 * 
 * <Enabled Skill Frame>
 *    :枠表示を有効にするか設定します。
 *    :0 - 無効, 1 - 有効
 * 
 * FTKR_DisplayCommandFrame.js がある場合、以下のプラグインパラメータで
 * スキル枠の表示タイプを変更できます。
 * 
 * <Skill Frame Type>
 *    :スキル枠の表示タイプを設定します
 *    :0 - 非表示
 * 
 * スキル枠の表示タイプを画像有り(3~5)に設定した場合、アクターのタグで設定した
 * <image index>および<image index on cursor>の画像番号が有効になります。
 * 
 * 表示タイプや、画像番号等については、FTKR_DisplayCommandFrame.jsの
 * ヘルプを参照してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルアイコンの設定
 *-----------------------------------------------------------------------------
 * スキルアイコンに対しては、スキル枠内の表示位置を設定できます。
 * 
 * <Skill Icon Offset X>
 *    :スキル枠左上を原点としたアイコンのX座標
 * <Skill Icon Offset Y>
 *    :スキル枠左上を原点としたアイコンのY座標
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキル名の設定
 *-----------------------------------------------------------------------------
 * 以下のパラメータでスキル名の表示内容を設定できます。
 * 
 * <Skill Name Format>
 *    :%1でスキル名を表示します。制御文字を使用できます。
 *    :スキル名がスキル枠の幅よりも長い場合は、制御文字 \LW を使用して
 *    :表示幅を調整してください。
 *    :
 *    :入力例)
 *    : \LW[100,%1]
 *    : ⇒スキル名の表示を100pixel内に収めます。
 * 
 * 以下のパラメータで、スキル名の表示位置を調整できます。
 * <Skill Name Offset X>
 *    :スキル枠左上を原点としたスキル名のX座標
 * <Skill Name Offset Y>
 *    :スキル枠左上を原点としたスキル名のY座標
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの複数回習得機能
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータにより、スキルを複数回習得できるようになります。
 * 
 * <Enabled Skill Count>
 *    :複数回習得機能を有効にする。
 *    :1 - 有効、0 - 無効
 * 
 * 
 * [最大習得回数の設定]
 * スキルのタグに以下を追加することで、スキルの習得回数を設定できます。
 * <Set Sts Data>
 * Max count: x
 * </Set Sts Data>
 *    :スキルを x 回習得できるようにする。
 *    :このタグがない場合は、プラグインパラメータ<Default Max Count>の
 *    :設定値に従います。
 * 
 * 
 * [習得回数の取得]
 * スキルの習得回数は、以下のプラグインコマンドで取得できます。
 * <STS Get Varcount(x) Actor(y) Skill(z)>
 * <STS 習得回数取得 変数(x) アクター(y) スキル(z)>
 *    :アクターID'y'のスキルID'z'の取得回数を、変数ID'x'に格納する。
 *    :'y'および'z'には、'v[n]'とすることでゲーム内変数ID'n'の値を
 *    :指定できます。
 * 
 * 
 * [習得回数の利用]
 * スキルの取得回数は、各ステータスのeval式に使用できます。
 * 
 * eval式に対して、以下のコードを使用できます。
 *  a.stsCount(x) - スキルID x の習得回数を参照します。
 * 
 * この機能により、習得回数によってダメージIDや使用効果を有効にすることや、
 * ステータスの値自体を変える、といった使い方ができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキル習得回数カウント枠の設定
 *-----------------------------------------------------------------------------
 * スキルの複数取得回数機能を有効にした場合の表示内容を設定できます。
 * 以下のパラメータで表示枠を設定します。
 * 
 * <Draw Count Frame>
 *    :枠線を表示するか
 * 
 * <Count Frame Width>
 *    :カウント枠の幅
 * <Count Frame Height>
 *    :カウント枠の高さ
 * <Count Frame Thick>
 *    :カウント枠の太さ
 * 
 * 
 * 以下のパラメータで、表示位置を調整できます。
 * <Count Frame Offset X>
 *    :スキル枠右上を原点としたカウント枠のX座標
 * <Count Frame Offset Y>
 *    :スキル枠右上を原点としたカウント枠のX座標
 * 
 * 
 * 以下のパラメータで表示内容を設定できます。
 * <Count Frame Format>
 *    :%1で習得回数を表示します。制御文字を使用できます。
 * <Count Frame Offset X>
 *    :カウント枠に対する習得回数のX座標
 * <Count Frame Offset Y>
 *    :カウント枠に対する習得回数のX座標
 * 
 * 
 * <Skill Learned Icon>
 *    :最大習得回数に達した時に表示するアイコン
 *    :このアイコンは、複数習得回数機能を有効にしない場合でも
 *    :スキルを習得すると表示します。
 * 
 * 
 * FTKR_DisplayCommandFrame.js がある場合、以下のプラグインパラメータで
 * カウント枠の表示タイプを変更できます。
 * 
 * <Count Frame Type>
 *    :カウント枠の表示タイプを設定します
 *    :0 - 非表示
 * 
 * カウント枠の表示タイプを画像有り(3~5)に設定した場合、以下の
 * プラグインパラメータでカウント枠の画像番号を設定できます。
 * 
 * <Default Frame Image Index>
 *    :カウント枠の画像番号を設定します
 * 
 * 表示タイプや、画像番号等については、FTKR_DisplayCommandFrame.jsの
 * ヘルプを参照してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターステータスウィンドウの表示設定
 *-----------------------------------------------------------------------------
 * アクターステータスウィンドウには、デフォルトで以下のパラメータを表示します。
 * 
 * アクターの顔画像、名前、レベル、SP値
 * 
 * 拡張プラグインのFTKR_CustomSimpleActorStatus.jsがある場合、
 * プラグインパラメータ<ステータスの表示設定/Actor Status Layout>以下の
 * 設定に従い、表示内容を変更することができます。
 * 
 * 各パラメータの意味と、設定方法は、
 * FTKR_CustomSimpleActorStatus.jsのヘルプを参照してください。
 * 
 * なお、歩行キャラ、SV戦闘キャラ、カスタムパラメータ、カスタムゲージの
 * 設定は、FTKR_CustomSimpleActorStatus.jsの設定に従います。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルツリーウィンドウの表示設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで、表示内容を変更します。
 * 
 * <Skill Tree Max Cols>
 *    :スキルを横に並べることができる数を設定します。
 *    :この設定値を超える数の起点スキルや派生スキルを設定しても認識しません。
 * 
 * <Skill Tree Height Space>
 *    :スキルツリーの縦のスキル間隔を設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキル説明ウィンドウの表示設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで、表示内容を変更します。
 * 
 * <Skill Status Title Format>
 *    :デフォルトで "「スキル名」のスキル情報" と表示している部分の設定です。
 *    :%1 を記述した箇所がアクター名に、%2 がスキル名に換わります。
 *    :制御文字が使えます。
 * 
 * <Adjust Skill Desc Width>
 *    :説明文に制御文字が使えなくなる代わりに、ウィンドウの枠内に
 *    :自動で納まるように調整する機能です。
 *    :0 - 無効、1 - 有効
 * 
 * 
 *-----------------------------------------------------------------------------
 * 習得コストウィンドウの表示設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで、表示内容を変更します。
 * 
 * <Cost Title Format>
 *    :デフォルトで "習得コスト" と表示している部分の設定です。
 *    :制御文字が使えます。
 *
 * <Cost Item Format>
 *    :デフォルトで、アイコンの後の "SP" 等と表示している部分の設定です。
 *    :%1 を記述した箇所が コスト名 に換わります。
 *    :制御文字が使えます。
 *
 * <Cost Number Format>
 *    :コストの数値を表示している部分の設定です。
 *    :'色番号, 文字列'の形式で記述します。
 *    :一つ目の数値がコスト数値の色を表します。
 *    :文字列に記述した %1 が コスト値、%2 が 手持ちの値に換わります。
 *    :文字列には制御文字は使用できません。
 * 
 * <Cost Number Width>
 *    :コスト数値の表示幅をpixel単位指定します。
 *    :コスト数値の文字列が表示幅を超える場合は、自動で文字サイズを調整します。
 *    :0 の場合は、幅を制限せずにそのまま表示します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 前提スキルウィンドウの表示設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで、表示内容を変更します。
 * 
 * <Preskill Title Format>
 *    :デフォルトで "前提スキル" と表示している部分の設定です。
 *    :制御文字が使えます。
 *
 * <Preskill Item Format>
 *    :デフォルトで、前提スキル名を表示している部分の設定です。
 *    :%1 を記述した箇所が スキル名 に換わります。
 *    :制御文字が使えます。
 *
 * 
 *-----------------------------------------------------------------------------
 * 確認ウィンドウの表示設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで、表示内容を変更します。
 * 
 * <Conf Title Format>
 *    :デフォルトで "スキル習得の確認" と表示している部分の設定です。
 *    :%1 を記述した箇所がアクター名に、%2 がスキル名に換わります。
 *    :制御文字が使えます。
 *
 * <Confirmation Ok Format>
 *    :デフォルトで、"実行する" を表示している部分の設定です。
 *    :制御文字は使えません。
 *
 * <Confirmation Cancel Format>
 *    :デフォルトで、"実行しない" を表示している部分の設定です。
 *    :制御文字は使えません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルツリーの初期化
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドで、スキルツリーを初期化できます。
 * リセットと初期化で使用したSP(*1)が戻るかどうか変わります。
 * 
 * (*1)使用したSPとは、スキルの習得にSPを消費した値の合計です。
 *     SPを消費せずにスキルを習得した場合は 0 と計算します。
 * 
 * <STS Reset Actor(x) ALL>
 * <STS リセット アクター(x) すべて>
 *        :アクターID'x'のスキルツリーをすべて初期化します。
 *        :使用したSPはすべて戻ります。
 * 
 * <STS Reset Actor(x) TreeType(y)>
 * <STS リセット アクター(x) ツリータイプ(y)>
 *        :アクターID'x'のスキルツリーID'y'をすべて初期化します。
 *        :使用したSPはすべて戻ります。
 * 
 * <STS Clear Actor(x) ALL>
 * <STS 初期化 アクター(x) すべて>
 *        :アクターID'x'のスキルツリーをすべて初期化します。
 *        :使用したSPは戻りません。
 * 
 * <STS Clear Actor(x) TreeType(y)>
 * <STS 初期化 アクター(x) ツリータイプ(y)>
 *        :アクターID'x'のスキルツリーID'y'をすべて初期化します。
 *        :使用したSPは戻りません。
 * 
 * 
 * また、以下のタグをアイテムのメモ欄に入力することで、ツリーを初期化する
 * アイテムにできます。
 * 
 * <STS Reset Tree>
 * <STS 全スキルツリー リセット>
 *        :対象のスキルツリーをすべて初期化します。
 *        :使用したSPはすべて戻ります。
 * 
 * <STS Clear Tree>
 * <STS 全スキルツリー 初期化>
 *        :対象のスキルツリーをすべて初期化します。
 *        :使用したSPは戻りません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキル習得実行時のSEの設定
 *-----------------------------------------------------------------------------
 * スキル習得実行時に鳴らすSEは種類、音量、ピッチ、位相を変更可能です。
 * 以下のプラグインパラメータで書式を変更できます。
 * 
 * <Learn SE Name>
 *    :SEに使用する種類を変更します。使用したいSE名を記載してください。
 * 
 * <Learn SE Volume>
 *    :SEの音量を変更します。
 * 
 * <Learn SE Pitch>
 *    :SEのピッチを変更します。
 * 
 * <Learn SE Pan>
 *    :SEの位相を変更します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変数およびスイッチの操作機能
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータを設定することで、スキル習得時のアクターとスキルの
 * 情報を取得できます。
 * 
 * <Learned Actor Var ID>
 *    :スキルを習得したアクターのIDを格納する変数IDを指定します。
 * 
 * <Learned Skill Var ID>
 *    :習得したスキルのIDを格納する変数IDを指定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 制御文字の追加
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、以下の制御文字を追加します。
 * 
 * \LW[表示幅(,文章,表示位置)]
 * 
 * 表示幅
 *    :文章を表示させる幅を、pixel単位で指定します。
 *    :文章を標準のサイズで表示するために必要な幅よりも小さい値の場合は、
 *    :文章を横に圧縮して表示します。
 * 
 * 文章
 *    :表示する文章を入力します。
 *    :制御文字は使用できません。
 *    :文章を入力しない場合、空欄をあける制御文字として使用できます。
 * 
 * 表示位置
 *    :表示幅内で文章をどの位置に表示するか指定します。
 *    :right - 右寄せ
 *    :center - 中央揃え
 *    :指定しない場合は、左寄せで表示します。
 * 
 * 入力例)
 * ◆文章：なし,ウィンドウ,下
 * ：   ：\LW[200,こんにちは]いい天気ですね。
 * ◆
 * ⇒上記のイベントの場合、メッセージ表示は
 * 「こんにちは　　　いい天気ですね。」となる。
 * 
 * 
 * 主に、本プラグインの制御文字が使用できるプラグインパラメータで、
 * 表示幅を規定したい場合に使用できます。
 *  例) スキル名やコスト名の表示など
 * 
 * 
 *-----------------------------------------------------------------------------
 * スクリプトコマンド
 *-----------------------------------------------------------------------------
 * 以下のスクリプトコマンドが使用できます。
 * eval値に使用する場合は、'$gameActors.actor(x)'を'a'に置き換えてください。
 * 
 * $gameActors.actor(x).stsSp()
 *    :指定したアクターの、現在SPを値を取得します。
 *    : x - アクターID
 * 
 * $gameActors.actor(x).isStsLearnedSkill(y)
 *    :指定したアクターが、指定したスキルを習得したことがあるかどうかを
 *    :取得します。
 *    : x - アクターID
 *    : y - スキルID
 * 
 * $gameActors.actor(x).canStsLearnedSkill(y)
 *    :指定したアクターが、指定したスキルを習得できるかどうかを
 *    :判定します。
 *    : x - アクターID
 *    : y - スキルID
 * 
 * $gameActors.actor(x).stsLearnSkill(y)
 *    :指定したアクターが、指定したスキルを習得します。
 *    :習得に必要なコストも同時に支払います。
 *    :スキルの複数回習得機能を有効にしている場合は、習得回数も増加します。
 *    : x - アクターID
 *    : y - スキルID
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドが使用できます。
 * なお、()で指定する値には、数値の変わりに v[n] と入力することで
 * 変数ID n の値を指定できます。
 * 
 * 1. スキルツリー画面の表示
 * STS Open
 * STS スキルツリー画面表示
 * 
 * 
 * 2. SPの取得
 * STS ADD SP(x) ACTOR(y)
 * STS 加算 SP(x) アクター(y)
 *    :指定したアクターが、SPを取得します。
 *    : x - 取得SP値
 *    : y - アクターID
 * 
 * 
 * 3. スキルの取得回数の取得
 * STS GET VARCOUNT(x) ACTOR(y) SKILL(Z)
 * STS 習得回数取得 変数(x) アクター(y) スキル(z)
 *    :指定したアクターがスキルを習得している回数を
 *    :ゲーム内変数に格納します。
 *    : x - 変数ID
 *    : y - アクターID
 *    : z - スキルID
 * 
 * 
 * 4. ツリーのリセット
 * STS RESET ACTOR(x) ALL
 * STS リセット アクター(x) すべて
 * 
 * STS RESET ACTOR(x) TREETYPE(y)
 * STS リセット アクター(x) ツリータイプ(y)
 *    :指定したアクターのスキルツリーを、すべてまたは指定した対象のみ
 *    :リセットします。
 *    :リセットしたツリーに使用したSPはアクターに戻ります。
 *    : x - アクターID
 *    : y - ツリータイプID
 * 
 * 
 * 5. ツリーの初期化
 * STS CLEAR ACTOR(x) ALL
 * STS 初期化 アクター(x) すべて
 * 
 * STS CLEAR ACTOR(x) TREETYPE(y)
 * STS 初期化 アクター(x) ツリータイプ(y)
 *    :指定したアクターのスキルツリーを、すべてまたは指定したツリーのみ
 *    :初期化します。
 *    :初期化したツリーに使用したSPはアクターに戻りません。
 *    : x - アクターID
 *    : y - ツリータイプID
 * 
 * 
 * 6. スキルを習得する
 * STS LEARN ACTOR(x) SKILL(y)
 * STS スキル習得 アクター(x) スキル(y)
 *    :指定したアクターが、指定したスキルを習得します。
 *    :習得に必要なコストも同時に支払います。
 *    :ただし、指定したスキルを習得する条件(前提スキル、コスト、習得条件)を
 *    :満たしていない場合は習得できません。
 *    : x - アクターID
 *    : y - スキルID
 * 
 * 
 * 7. スキルツリーを追加する
 * STS ADD TREETYPE(x) ACTOR(y)
 * STS 追加 ツリータイプ(x) アクター(x)
 *    :指定したアクターに、指定したスキルツリーを追加します。
 *    : x - ツリータイプID
 *    : y - アクターID
 * 
 * 
 * 8. スキルツリーを削除する
 * STS REDUCE TREETYPE(x) ACTOR(y)
 * STS 削除 ツリータイプ(x) アクター(x)
 *    :指定したアクターの、指定したスキルツリーを削除します。
 *    :ただし、初めから適用しているツリータイプ(アクターとクラスのタグで
 *    :設定したもの)は削除できません。
 *    : x - ツリータイプID
 *    : y - アクターID
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.7.6 - 2017/06/05 : 不具合修正
 *    1. 消費コストの表示が正しく反映されない不具合を修正。
 *    1. ツリーリセット時に通常よりも多くSPが戻る不具合を修正。
 * 
 * v1.7.5 - 2017/06/03 : 不具合修正
 *    1. ツリーリセット時に複数回習得させた分のSPが戻らない不具合を修正。
 * 
 * v1.7.4 - 2017/05/24 : ヘルプ修正
 * 
 * v1.7.3 - 2017/05/18 : 不具合修正
 *    1. 横方向の位置を調整する機能の不具合を修正。
 * 
 * v1.7.2 - 2017/05/13 : 機能追加
 *    1. 戦闘終了時にSP獲得メッセージを表示する機能を追加。
 * 
 * v1.7.1 - 2017/05/12 : 機能追加
 *    1. 縦の表示位置を変更する機能に横方向の位置を調整する機能を追加。
 *    2. カギ線の表示タイプを追加。
 * 
 * v1.7.0 - 2017/05/09 : 機能追加
 *    1. スキルのスキルツリー上の縦の表示位置を変更する機能を追加。
 * 
 * v1.6.7 - 2017/05/05 : 不具合修正
 *    1. スキルツリーの空欄設定が反映されない不具合を修正。
 * 
 * v1.6.6 - 2017/05/05 : 機能追加
 *    1. 説明文とコスト数値の幅調整機能を追加。
 * 
 * v1.6.5 - 2017/04/29 : 機能追加
 *    1. 計算式(eval)にセルフ変数を使用できるように見直し。
 * 
 * v1.6.4 - 2017/04/18 : 不具合修正、機能追加
 *    1. stsCount()を計算式に入れたスキルを敵が使うと正しく計算できない
 *       不具合を修正。
 *    2. スキルの表示条件を設定する機能を追加。
 * 
 * v1.6.3 - 2017/04/07 : 機能追加、ヘルプファイルと合体。
 *    1. タグに日本語表記版を追加。
 *    2. FTKR_SkillTreeSystem_helpの内容を追記。
 *    3. 習得コストと前提スキルウィンドウの常時表示設定の変更機能を削除。
 * 
 * v1.6.2 - 2017/04/02 : 不具合修正、機能追加
 *    1. レベルアップ時に入手するSPが正しく加算されない不具合を修正。
 *    2. ツリーリセット時にSPが戻る機能が正しく動作していない不具合を修正。
 *    3. スキルツリーを追加・削除するプラグインコマンドを追加。
 * 
 * v1.6.1 - 2017/04/01 : ヘルプ修正
 * 
 * v1.6.0 - 2017/03/31 : 仕様変更、機能追加
 *    1. FTKR_SkillExpansion.jsとFTKR_SEP_ShowSkillStatus.jsに移していた
 *       処理を見直し。プラグイン単独で動作可能なように変更。
 *    2. ウィンドウレイアウトの変更機能を削除。
 *    3. FTKR_DisplayCommandFrame.js がない場合でも、枠線を表示できるように
 *       変更。
 *    4. 専用の制御文字を使用する機能を削除、MV標準の制御文字を使用できる
 *       ように変更。
 *    5. 指定したテキスト幅n内に文章strを表示する制御文字\LW[n,str]を追加。
 *    6. スキルの複数回習得のデータ保存をFTKR_SkillExpansion.jsに
 *       依存しない方式に変更。
 *    7. スキルの実行処理部に例外処理を追加。
 *    8. プラグインコマンドに、スキル習得コマンドおよび日本語表記を追加。
 *    9. ヘルプ修正,、ライセンス表記変更
 * 
 * v1.5.0 - 2017/03/24 : 仕様変更、機能追加
 *    1. FTKR_SkillExpansion.js v1.3.0 に合わせて処理を見直し。
 *    2. FTKR_CustomSimpleActorStatus.js がない場合でも、アクター名、
 *       レベル、SP量を表示するように変更。
 *    3. FTKR_DisplayCommandFrame.js がない場合に、枠表示機能が無効になる
 *       ように変更。
 * 
 * v1.4.0 - 2017/03/18 : 仕様変更(不具合修正)
 *    1. FTKR_CustomSimpleActorStatus.js v1.1.0 に合わせて
 *       プラグインパラメータを見直し。
 * 
 * v1.3.1 - 2017/03/18 : 処理追加
 *    1. FTKR_SkillExpansion.js v1.2.2に合わせて処理を追加。
 * 
 * v1.3.0 - 2017/03/16 : 仕様変更、機能追加
 *    1. FTKR_SEP_ShowSkillStatus.js v1.3.0 に合わせて処理を見直し。
 *    2. 習得コストの値にjs計算式を使用できる機能を追加。
 *    3. スキルの習得条件に、他のスキルの習得回数を設定できる機能を追加。
 *    4. スキルを削除した時に習得回数をリセットしない機能を追加。
 *    5. 前提スキルの有無の判定を、習得したことがあるかないかに変更。
 * 
 * v1.2.0 - 2017/03/10 : 仕様変更、機能追加、誤記修正
 *    1. アクターのステータス表示を、FTKR_CustomSimpleActorStatus.jsの
 *       方式に変更。
 *    2. 枠の表示処理を、FTKR_DisplayCommandFrame.jsから読み取る方式に変更。
 *    3. 確認ウィンドウの設定を、本プラグインの設定で上書きできるように変更。
 *    4. 誤記修正
 * 
 * v1.1.4 - 2017/03/07 : 不具合修正、機能追加
 *    1. スキルリセット時にSPが不正な値になる不具合を修正。
 *    2. スキルの習得コストに武器と防具を追加。
 *    3. スキル習得のための前提スキルを表示するウィンドウを追加。
 * 
 * v1.1.3 - 2017/03/05 : 不具合修正
 *    1. スキルの習得コストの情報を読み取るときに、例外処理が抜けていた
 *       不具合を修正。
 * 
 * v1.1.2 - 2017/03/05 : 不具合修正
 *    1. 画像表示時にエラーになる不具合修正。
 * 
 * v1.1.1 - 2017/03/05 : 機能追加、仕様変更
 *    1. ツリータイプ枠に画像を使用できる機能を追加。
 *    2. カーソルと重なっている時に枠画像を別の画像に変更する機能を追加。
 *    3. スキルツリー別に派生スキルを設定できる機能を追加。
 *    4. スキル習得時に、アクターIDとスキルIDを指定した変数に格納する機能を追加。
 *    5. スキル枠画像の表示設定で、スキルタイプと属性による画像変更機能を削除。
 *    6. ヘルプを別ファイルに移動。
 * 
 * v1.1.0 - 2017/03/03 : 機能追加
 *    1. ウィンドウサイズや位置を変更できる機能を追加。
 *    2. ウィンドウに背景画像を表示できる機能を追加。
 *    3. ツリーのスキル枠のサイズや位置、表示テキストなどを変更できる
 *       機能を追加。
 *    4. スキル枠やスキルカウント枠に画像を使用できる機能を追加。
 *    5. SPコストが0の場合に非表示にできる機能を追加。
 *    6. アクターステータスウィンドウの表示内容を変更できる機能を追加。
 *    7. プラグイン内の一部の関数をFTKR_SEP_ShowSkillStatus.jsに移動。
 *    8. ヘルプの記載内容を見直し。
 * 
 * v1.0.4 - 2017/03/02 : 不具合修正
 *    1. ゲーム開始時に、SPとスキルの習得回数がリセットする不具合を修正。
 * 
 * v1.0.3 - 2017/02/28 : 機能追加
 *    1. スキル習得状態と消費したSPをリセットするプラグインコマンドと
 *       アイテム用のタグを追加。
 *    2. アクターとクラス用のタグを変更。
 *    3. 初期状態で習得済みのスキルに対しても習得回数を反映するように修正。
 * 
 * v1.0.2 - 2017/02/26 : 機能追加
 *    1. スキル間の線の色を、スキル枠の色に合わせられる機能を追加。
 *    2. FTKR_SkillExpansion.jsと組み合わせることで、スキルを複数回
 *       習得させることができる機能を追加。
 *    3. プラグインコマンド<STS Get Sp() Actor()>を
 *       <STS Add Sp() Actor()>に変更。
 * 
 * v1.0.1 - 2017/02/26 : 機能追加
 *    1. レベルアップ以外で、SPを取得できる機能を追加。
 * 
 * v1.0.0 - 2017/02/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.STS.parameters = PluginManager.parameters('FTKR_SkillTreeSystem');

//必須設定
FTKR.STS.skillTreeId = Number(FTKR.STS.parameters['Skill Tree Id'] || 0);

//基本設定
FTKR.STS.showCommand = Number(FTKR.STS.parameters['Show Skill Command'] || 0);
FTKR.STS.commandName = String(FTKR.STS.parameters['Command Name'] || 'スキル習得');
FTKR.STS.menuSwitchId = Number(FTKR.STS.parameters['Skill Menu Switch ID'] || 0);
FTKR.STS.enableConf = Number(FTKR.STS.parameters['Enable Confirmation'] || 0);
FTKR.STS.learnedActorVarID = Number(FTKR.STS.parameters['Learned Actor Var ID'] || 0);
FTKR.STS.learnedSkillVarID = Number(FTKR.STS.parameters['Learned Skill Var ID'] || 0);
FTKR.STS.resetWhenForgottenSkill = Number(FTKR.STS.parameters['Reset When Forgotten Skill'] || 0);

//習得回数の設定
FTKR.STS.enableSkillCount = Number(FTKR.STS.parameters['Enabled Skill Count'] || 0);
FTKR.STS.defaultMaxCount = Number(FTKR.STS.parameters['Default Max Count'] || 0);
FTKR.STS.skillLearnedIcon = Number(FTKR.STS.parameters['Skill Learned Icon'] || 0);

//スキルポイント関係
FTKR.STS.sp = {
    dispName:String(FTKR.STS.parameters['SP Display Name'] || 'SP'),
    defaultReq:String(FTKR.STS.parameters['Default Required SP'] || ''),
    getLevelUp:String(FTKR.STS.parameters['Get Level Up Sp'] || ''),
    icon:Number(FTKR.STS.parameters['Cost Sp Icon'] || 0),
    hideCost0:Number(FTKR.STS.parameters['Hide Sp Cost 0'] || 0),
    format:String(FTKR.STS.parameters['Display Get Sp'] || ''),
};

//スキル枠
FTKR.STS.sFrame = {
  type:Number(FTKR.STS.parameters['Skill Frame Type'] || 0),
  enabled:Number(FTKR.STS.parameters['Enabled Skill Frame'] || 0),
  width:Number(FTKR.STS.parameters['Skill Frame Width'] || 0),
  height:Number(FTKR.STS.parameters['Skill Frame Height'] || 0),
  icon:{
    offsetX:Number(FTKR.STS.parameters['Skill Icon Offset X'] || 0),
    offsetY:Number(FTKR.STS.parameters['Skill Icon Offset Y'] || 0)
  },
  text:{
    format:String(FTKR.STS.parameters['Skill Name Format'] || ''),
    offsetX:Number(FTKR.STS.parameters['Skill Text Offset X'] || 0),
    offsetY:Number(FTKR.STS.parameters['Skill Text Offset Y'] || 0)
  },
  color:{
    isLearned:Number(FTKR.STS.parameters['Frame Color isLearned'] || 0),
    isLearnOk:Number(FTKR.STS.parameters['Frame Color isLearn OK'] || 0),
    isReqSkillNg:Number(FTKR.STS.parameters['Frame Color isReqSkill NG'] || 0),
    isReqNg:Number(FTKR.STS.parameters['Frame Color isRequired NG'] || 0)
  },
};

//スキルカウント枠
FTKR.STS.cFrame = {
  type:Number(FTKR.STS.parameters['Count Frame Type'] || 0),
  defIndex:Number(FTKR.STS.parameters['Default Frame Image Index'] || 0),
  enabled:Number(FTKR.STS.parameters['Draw Count Frame'] || 0),
  width:Number(FTKR.STS.parameters['Count Frame Width'] || 0),
  height:Number(FTKR.STS.parameters['Count Frame Height'] || 0),
  thick:Number(FTKR.STS.parameters['Count Frame Thick'] || 0),
  offsetX:Number(FTKR.STS.parameters['Count Frame Offset X'] || 0),
  offsetY:Number(FTKR.STS.parameters['Count Frame Offset Y'] || 0),
  format:String(FTKR.STS.parameters['Count Frame Format'] || ''),
  count:{
    offsetX:Number(FTKR.STS.parameters['Skill Count Offset X'] || 0),
    offsetY:Number(FTKR.STS.parameters['Skill Count Offset Y'] || 0),
  },
};

//ツリーの設定
FTKR.STS.drawLineType = Number(FTKR.STS.parameters['Draw Line Type'] || 0);
FTKR.STS.treeLineThick = Number(FTKR.STS.parameters['Tree Line Thick'] || 0);
FTKR.STS.addFrameToLine = Number(FTKR.STS.parameters['Add Frame To Line'] || 0);
FTKR.STS.lineColor = Number(FTKR.STS.parameters['Fit Line Color To Frame'] || 0);

//アクターステータスウィンドウ設定
FTKR.STS.actorStatus = {
  text1:String(FTKR.STS.parameters['Actor Status Text1'] || ''),
  text2:String(FTKR.STS.parameters['Actor Status Text2'] || ''),
  text3:String(FTKR.STS.parameters['Actor Status Text3'] || ''),
  space:String(FTKR.STS.parameters['Actor Status Space'] || ''),
  spaceIn:Number(FTKR.STS.parameters['Actor Status Space In Text'] || 0),
  widthRate:String(FTKR.STS.parameters['Actor Status Width Rate'] || ''),
  faceLine:Number(FTKR.STS.parameters['Display Face Scale'] || 0),
};
//スキルステータスウィンドウ設定
FTKR.STS.skillStatus = {
  titleFormat:String(FTKR.STS.parameters['Skill Status Title Format'] || ''),
  adjustWidth:Number(FTKR.STS.parameters['Adjust Skill Desc Width'] || 0),
};
//ツリータイプウィンドウ設定
FTKR.STS.treeTypes = {
  enabled:Number(FTKR.STS.parameters['Display Tree Type Frame'] || 0),
};
//コストウィンドウ設定
FTKR.STS.cost = {
  titleFormat:String(FTKR.STS.parameters['Cost Title Format'] || ''),
  itemFormat:String(FTKR.STS.parameters['Cost Item Format'] || ''),
  numberFormat:String(FTKR.STS.parameters['Cost Number Format'] || ''),
  numberWidth:Number(FTKR.STS.parameters['Cost Number Width'] || 0),
};
//スキルツリーウィンドウ設定
FTKR.STS.skillTree = {
  maxCols:Number(FTKR.STS.parameters['Skill Tree Max Cols'] || 0),
  heightSpace:Number(FTKR.STS.parameters['Skill Tree Height Space'] || 0),
};
//前提スキルウィンドウ設定
FTKR.STS.preskill = {
  titleFormat:String(FTKR.STS.parameters['Preskill Title Format'] || ''),
  itemFormat:String(FTKR.STS.parameters['Preskill Item Format'] || ''),
};

//確認ウィンドウ設定
FTKR.STS.conf = {
  titleformat:String(FTKR.STS.parameters['Conf Title Format'] || ''),
  okFormat:String(FTKR.STS.parameters['Confirmation Ok Format'] || ''),
  cancelFormat:String(FTKR.STS.parameters['Confirmation Cancel Format'] || ''),
};

//SE
FTKR.STS.stsSe = {
  name:String(FTKR.STS.parameters['Learn SE Name'] || 'Sound2'),
  volume:Number(FTKR.STS.parameters['Learn SE Volume'] || 0),
  pitch:Number(FTKR.STS.parameters['Learn SE Pitch'] || 0),
  pan:Number(FTKR.STS.parameters['Learn SE Pan'] || 0),
};

//コストアイコン
FTKR.STS.icon = {
  gold:Number(FTKR.STS.parameters['Cost Gold Icon'] || 0),
  var:Number(FTKR.STS.parameters['Cost Variables Icon'] || 0),
};

FTKR.STS.MAX_DEVSKILL_COUNT = 20;

Game_Action.EFFECT_GET_SP = 999;
Game_Action.EFFECT_RESET_TREE = 998;
Game_Action.EFFECT_CLEAR_TREE = 997;

FTKR.Utility = FTKR.Utility || {};

//=============================================================================
// 自作関数(グローバル)
//=============================================================================

FTKR.gameData = FTKR.gameData || {
    user   :null,
    target :null,
    item   :null,
    number :0,
};

if (!FTKR.setGameData) {
FTKR.setGameData = function(user, target, item, number) {
    FTKR.gameData = {
        user   :user || null,
        target :target || null,
        item   :item || null,
        number :number || 0
    };
};
}

if (!FTKR.evalFormula) {
FTKR.evalFormula = function(formula) {
    var datas = FTKR.gameData;
    try {
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var a = datas.user;
        var b = datas.target;
        var item   = datas.item;
        var number = datas.number;
        if (b) var result = b.result();
        var value = eval(formula);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.error(e);
        return 0;
    }
};
}

//=============================================================================
// Bitmap
//=============================================================================

//座標(x1,y1)から座標(x2,y2)までの線を引く
Bitmap.prototype.drawLine = function(x1, y1, x2, y2, color, thick) {
    var context = this._context;
    context.strokeStyle = color;
    context.lineWidth = thick;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
    this._setDirty();
};

//枠線を描く
Bitmap.prototype.drawFrame = function(x, y, width, height, thick, color) {
    var context = this._context;
    context.strokeStyle = color;
    context.lineWidth = thick;
    context.strokeRect(x + thick/2, y + thick/2, width - thick, height - thick);
    this._setDirty();
};

//=============================================================================
// Array
//=============================================================================

//重複した要素を除いて、Array配列にlist配列の要素を加える。
Array.prototype.addExceptForDup = function(list) {
    list.forEach( function(item) {
        if (item === null || !this.contains(item)) this.push(item);
    },this);
};

//=============================================================================
// Math
//=============================================================================

/*--------------------------
a,b 二つの値の大小を比較して、
 a > b なら +1
 a < b なら -1
 それ以外の結果なら 0 を返す
--------------------------*/
Math.code = function(a, b) {
  if (a > b) {
    return +1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
};

//=============================================================================
// BattleManager
//=============================================================================

FTKR.STS.BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    FTKR.STS.BattleManager_makeRewards.call(this);
    this._rewards.stsSps = $gameTroop.stsSpTotal();
};

FTKR.STS.BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    FTKR.STS.BattleManager_gainRewards.call(this);
    this.gainStsSp();
};

BattleManager.gainStsSp = function() {
    var sp = this._rewards.stsSps;
    $gameParty.allMembers().forEach(function(actor) {
        actor.getSp(sp);
    });
};

FTKR.STS.BattleManager_displayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
    FTKR.STS.BattleManager_displayRewards.call(this);
    this.displayStsSp();
};

BattleManager.displayStsSp = function() {
    var sp = this._rewards.stsSps;
    if (sp > 0) {
        var text = FTKR.STS.sp.format.format(sp, FTKR.STS.sp.dispName);
        if (text) $gameMessage.add('\\.' + text);
    }
};

//=============================================================================
// DataManager
//=============================================================================

FTKR.STS.DatabaseLoaded = false;
FTKR.STS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.STS.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.STS.DatabaseLoaded) {
        this.stsTreeListNotetags($dataActors);
        this.stsTreeListNotetags($dataClasses);
        this.stsItemGetSpNotetags($dataItems);
        this.stsTreeDataNotetags($dataWeapons);
        this.stsTreeDataNotetags($dataSkills);
        FTKR.STS.DatabaseLoaded = true;
    }
    return true;
};

DataManager.stsTreeListNotetags = function(group) {
    var note1a = /<(?:SET STS DATA)>/i;
    var note1b = /<\/(?:SET STS DATA)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.sts = {
            data:'',
            treeTypes:[],
            initsp:0,
        };
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (note1a.test(line)) {
                var text = '';
                setMode = 'data';
            } else if (note1b.test(line)) {
                setMode = 'none';
                obj.sts.data = text;
            } else if (setMode === 'data') {
                text += line + ';';
            }
        }
        this.setStsActorData(obj);
    }
};

DataManager.setStsActorData = function(obj) {
    var stsdata = obj.sts.data;
    if (stsdata) {
        var case1 = /(?:INIT SP):[ ]*(\d+)/i;
        var case1j = /初期 SP:[ ]*(\d+)/i;
        var case2 = /(?:TREETYPE):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case2j = /ツリータイプ:[ ]*(\d+(?:\s*,\s*\d+)*)/i;

        var datas = stsdata.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if(data.match(case1) || data.match(case1j)) {
                obj.sts.initsp = Number(RegExp.$1);
            } else if(data.match(case2) || data.match(case2j)) {
                var tTypeIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                tTypeIds.forEach( function(tTypeId) {
                    var item = $dataWeapons[tTypeId];
                    if (item && item.wtypeId === FTKR.STS.skillTreeId) {
                        obj.sts.treeTypes.push(tTypeId);
                    }
                });
            }
        }
        obj.sts.data = '';
    }
};

DataManager.stsItemGetSpNotetags = function(group) {
    var note1 = /<(?:STS GET SP):[ ]*(\d+)>/i;
    var note1j = /<STS SP 入手:[ ]*(\d+)>/i;
    var note2 = /<(?:STS RESET TREE)>/i;
    var note2j = /<STS 全スキルツリー リセット>/i;
    var note3 = /<(?:STS CLEAR TREE)>/i;
    var note3j = /<STS 全スキルツリー 初期化>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1) || note1j.test(line)) {
                obj.effects.push(this.setEffect(Game_Action.EFFECT_GET_SP, 0, Number(RegExp.$1), 0));
            } else if (note2.test(line) || note2j.test(line)) {
                obj.effects.push(this.setEffect(Game_Action.EFFECT_RESET_TREE, 0, 0, 0));
            } else if (note3.test(line) || note3j.test(line)) {
                obj.effects.push(this.setEffect(Game_Action.EFFECT_CLEAR_TREE, 0, 0, 0));
            }
        }
    }
};

DataManager.setEffect = function(code, value1, value2, dataId) {
    return {code:code, value1:value1, value2:value2, dataId:dataId};
};

DataManager.stsTreeDataNotetags = function(group) {
    var note1a = /<(?:SET STS DATA)>/i;
    var note1b = /<\/(?:SET STS DATA)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.sts = {
            skillIds:[],
            tree:[{},],
            data:'',
            required:'',
            costs:[],
            maxCount:FTKR.STS.defaultMaxCount,
            pIndex:0,
            pCIndex:0,
            show:'',
            position:0,
            diffX:0,
        };
        obj.sts.costs.push(this.setCost('sp', 0, FTKR.STS.sp.defaultReq));

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (note1a.test(line)) {
                var text = '';
                setMode = 'data';
            } else if (note1b.test(line)) {
                setMode = 'none';
                obj.sts.data = text;
            } else if (setMode === 'data') {
                text += line + ';';
            }
        }
        this.setStsData(obj);
    }
};

DataManager.setCost = function(type, id, value) {
    return {type:type, id:Number(id), value:value};
};

DataManager.setStsData = function(obj) {
    var stsdata = obj.sts.data;
    if (stsdata) {
        var case1 = /(?:REQUIRED):[ ]*(.+)/i;
        var case1j = /習得条件:[ ]*(.+)/i;
        var case2 = /(?:COST SP):[ ]*(.+)/i;
        var case2j = /コスト SP:[ ]*(.+)/i;
        var case3a = /(?:TREE)[ ](\d+)[ ](?:SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case3aj = /ツリータイプ (\d+) スキル:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case3b = /(?:SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case3bj = /スキル:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case4 = /(?:COST ITEM\[)(\d+)\]:[ ]*(.+)/i;
        var case4j = /コスト アイテム\[(\d+)\]:[ ]*(.+)/i;
        var case4a = /(?:COST WEAPON\[)(\d+)\]:[ ]*(.+)/i;
        var case4aj = /コスト 武器\[(\d+)\]:[ ]*(.+)/i;
        var case4b = /(?:COST ARMOR\[)(\d+)\]:[ ]*(.+)/i;
        var case4bj = /コスト 防具\[(\d+)\]:[ ]*(.+)/i;
        var case5 = /(?:COST V\[)(\d+)\]:[ ]*(.+)/i;
        var case5j = /コスト V\[(\d+)\]:[ ]*(.+)/i;
        var case6 = /(?:COST GOLD):[ ]*(.+)/i;
        var case6j = /コスト 金:[ ]*(.+)/i;
        var case7 = /(?:MAX COUNT):[ ]*(\d+)/i;
        var case7j = /最大習得回数:[ ]*(\d+)/i;
        var case8 = /(?:Image INDEX):[ ]*(\d+)/i;
        var case8j = /枠画像番号:[ ]*(\d+)/i;
        var case9 = /(?:Image INDEX ON CURSOR):[ ]*(\d+)/i;
        var case9j = /カーソル枠画像番号:[ ]*(\d+)/i;
        var case10 = /(?:SHOW):[ ]*(.+)/i;
        var case10j = /表示条件:[ ]*(.+)/i;
        var case11 = /(?:POSITION):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case11j = /表示位置:[ ]*(\d+(?:\s*,\s*\d+)*)/i;

        var datas = stsdata.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.match(case1) || data.match(case1j)) {
                obj.sts.required = String(RegExp.$1);
            } else if(data.match(case2) || data.match(case2j)) {
                obj.sts.costs[0].value = String(RegExp.$1);
            } else if(data.match(case3a) || data.match(case3aj)) {
                var treeId = RegExp.$1;
                var tree = this.readTree(obj, RegExp.$1, RegExp.$2);
                tree.treeId === 0 ? obj.sts.tree[0] = tree : obj.sts.tree.push(tree);
            } else if(data.match(case3b) || data.match(case3bj)) {
                var tree = this.readTree(obj, 0, RegExp.$1);
                obj.sts.tree[0] = tree;
                obj.sts.skillIds = tree.skillIds;
            } else if(data.match(case4) || data.match(case4j)) {
                obj.sts.costs.push(this.setCost('item', RegExp.$1, RegExp.$2));
            } else if(data.match(case4a) || data.match(case4aj)) {
                obj.sts.costs.push(this.setCost('weapon', RegExp.$1, RegExp.$2));
            } else if(data.match(case4b) || data.match(case4bj)) {
                obj.sts.costs.push(this.setCost('armor', RegExp.$1, RegExp.$2));
            } else if(data.match(case5) || data.match(case5j)) {
                obj.sts.costs.push(this.setCost('var', RegExp.$1, RegExp.$2));
            } else if(data.match(case6) || data.match(case6j)) {
                obj.sts.costs.push(this.setCost('gold', 0, RegExp.$2));
            } else if(data.match(case7) || data.match(case7j)) {
                obj.sts.maxCount = Number(RegExp.$1);
            } else if(data.match(case8) || data.match(case8j)) {
                obj.sts.pIndex = Number(RegExp.$1);
            } else if(data.match(case9) || data.match(case9j)) {
                obj.sts.pCIndex = Number(RegExp.$1);
            } else if (data.match(case10) || data.match(case10j)) {
                obj.sts.show = String(RegExp.$1);
            } else if (data.match(case11) || data.match(case11j)) {
                var posis = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                obj.sts.position = Number(posis[0]);
                if (posis[1]) obj.sts.diffX = Number(posis[1]);
            }
        }
        obj.sts.data = '';
    }
};

DataManager.readTree = function(obj, treeId, regexp) {
    var tree = {
      treeId:Number(treeId),
      skillIds:[]
    };
    var objIds = JSON.parse('[' + regexp.match(/\d+/g) + ']');
    objIds.forEach( function(objId) {
        var item = $dataSkills[objId];
        if (!item || (obj.hasOwnProperty('stypeId') && obj.id === objId)) {
          tree.skillIds.push(null);
        } else {
          tree.skillIds.push(objId);
        }
    });
    return tree;
};

//=============================================================================
// Game_Actor
//=============================================================================

FTKR.STS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    FTKR.STS.Game_Actor_initMembers.call(this);
    this._stsSp = 0;
    this._stsLearnSkills = [];
    this._stsTrees = [];
    this._stsCount = [];
    this._stsUsedSp = [];
};

FTKR.STS.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    FTKR.STS.Game_Actor_setup.call(this, actorId);
    ImageManager.loadFace(this.faceName());
    this.getSp(this.actor().sts.initsp);
};

FTKR.STS.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    FTKR.STS.Game_Actor_levelUp.call(this);
    FTKR.setGameData(this, null, null);
    this.getSp(this.evalStsFormula(FTKR.STS.sp.getLevelUp, 0, 0));
};

FTKR.STS.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    if (!this.isStsLearnedSkill(skillId)) {
        this.setStsSkillCount(skillId, 0);
    }
    FTKR.STS.Game_Actor_learnSkill.call(this, skillId);
    if (this.isLearnedSkill(skillId) && !this.stsCount(skillId)) {
        if (FTKR.STS.learnedActorVarID) $gameVariables.setValue(FTKR.STS.learnedActorVarID, this.actorId());
        if (FTKR.STS.learnedSkillVarID) $gameVariables.setValue(FTKR.STS.learnedSkillVarID, skillId);
        this.stsCountUp(skillId);
        this._stsLearnSkills[skillId] = true;
    }
};

FTKR.STS.Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
    if (FTKR.STS.resetWhenForgottenSkill) {
        this.resetStsSkill(skillId);
    }
    FTKR.STS.Game_Actor_forgetSkill.call(this, skillId);
};

Game_Actor.prototype.resetStsSkill = function(skillId) {
    this.setStsSkillCount(skillId, 0);
    this._stsLearnSkills[skillId] = false;
};

Game_Actor.prototype.stsCount = function(skillId) {
    return this._stsCount[skillId] || 0;
};

Game_Actor.prototype.setStsSkillCount = function(skillId, value) {
    return this._stsCount[skillId] = value;
};

Game_Actor.prototype.stsCountUp = function(skillId) {
    if (FTKR.STS.enableSkillCount) {
        this.setStsSkillCount(skillId, this.stsCount(skillId) + 1);
    }
};

Game_Actor.prototype.stsUsedSp = function(skillId) {
    if (!this.isLearnedSkill(skillId)) return 0;
    return this._stsUsedSp[skillId];
};

Game_Actor.prototype.stsAddUsedSp = function(skillId, value) {
    if (!this._stsUsedSp[skillId]) this._stsUsedSp[skillId] = 0;
    this._stsUsedSp[skillId] += value;
};

Game_Actor.prototype.evalStsFormula = function(formula, result1, result2) {
    if (!formula) return result1;
    return Math.max(Math.floor(FTKR.evalFormula(formula)), result2);
};

Game_Actor.prototype.payLearnedCost = function(skillId) {
    var skill = this.stsSkill(skillId);
    FTKR.setGameData(this, null, skill);
    this.payLearnedAnyCost(skill.sts.costs);
};

Game_Actor.prototype.payLearnedAnyCost = function(costs) {
    costs.forEach( function(cost){
        return this.paySepCost(cost);
    },this);
};

Game_Actor.prototype.paySepCost = function(cost) {
    var value = this.evalStsFormula(cost.value,0,0);
    switch (cost.type) {
        case 'item':
          return $gameParty.loseItem($dataItems[cost.id], value);
        case 'var':
          return $gameVariables.setValue(cost.id, $gameVariables.value(cost.id) - value);
        case 'gold':
          return $gameParty.loseGold(value);
        case 'weapon':
          return $gameParty.loseItem($dataWeapons[cost.id], value);
        case 'armor':
          return $gameParty.loseItem($dataArmors[cost.id], value);
        case 'sp':
          this.stsAddUsedSp(FTKR.gameData.item.id, value);
          return this.loseSp(value);
    }
};

Game_Actor.prototype.isPayCostNg = function(cost) {
    var value = this.evalStsFormula(cost.value,0,0);
    switch (cost.type) {
      case 'item':
        return $gameParty.numItems($dataItems[cost.id]) < value;
      case 'var':
        return $gameVariables.value(cost.id) < value;
      case 'gold':
        return $gameParty.gold() < value;
      case 'weapon':
        return $gameParty.numItems($dataWeapons[cost.id]) < value;
      case 'armor':
        return $gameParty.numItems($dataArmors[cost.id]) < value;
      case 'sp':
        return this.stsSp() < value;
    }
};

Game_Actor.prototype.getSp = function(value) {
  this._stsSp += value;
};

Game_Actor.prototype.loseSp = function(value) {
  this._stsSp -= value;
};

Game_Actor.prototype.stsSp = function() {
  return this._stsSp;
};

Game_Actor.prototype.isStsLearnedSkill = function(skillId) {
    return this._stsLearnSkills[skillId];
};

Game_Actor.prototype.canStsLearnedSkill = function(skillId) {
    var results = [
        this.getTreeTypes().filter( function(tTypeId) {
            return this.isReqSkillOk(skillId, tTypeId);
        },this).length,
        this.isReqParamOk(skillId),
        this.isPayCostOk(skillId),
        this.isStsLearnedOk(skillId),
    ];
    return $dataSkills[skillId] && results.filter( function(elm) { return !elm; });
};

Game_Actor.prototype.isStsLearnedOk = function(skillId) {
  if (FTKR.STS.enableSkillCount) {
    var skill = this.stsSkill(skillId);
    return this.stsCount(skillId) < skill.sts.maxCount;
  } else {
    return !this.isStsLearnedSkill(skillId);
  }
};

Game_Actor.prototype.isPayCostOk = function(skillId) {
    var skill = this.stsSkill(skillId);
    FTKR.setGameData(this, null, skill);
    var costs = skill.sts.costs;
    if (!costs.length) return true;
    return !costs.filter( function(cost) {
        return this.isPayCostNg(cost);
    },this).length;
};

Game_Actor.prototype.isReqParamOk = function(skillId) {
    var skill = this.stsSkill(skillId);
    FTKR.setGameData(this, null, skill);
    return this.evalStsFormula(skill.sts.required, true, false);
};

Game_Actor.prototype.stsLearnSkill = function(skillId) {
    this.payLearnedCost(skillId);
    this.stsCountUp(skillId);
    this.learnSkill(skillId);
};

Game_Actor.prototype.stsSkill = function(skillId) {
  return Imported.FTKR_SEP ? this.getSkill(skillId) : $dataSkills[skillId];
};

Game_Actor.prototype.getTreeTypes = function() {
  var tTypes = this.actor().sts.treeTypes.concat(this.currentClass().sts.treeTypes, this._stsTrees);
  return !tTypes.length ? [] : FTKR.Utility.duplicateDelete(tTypes);
};

Game_Actor.prototype.addTreetype = function(treeTypeId) {
    if (!this._stsTrees.contains(treeTypeId)) this._stsTrees.push(treeTypeId);
};

Game_Actor.prototype.reduceTreetype = function(treeTypeId) {
    var index = this._stsTrees.indexOf(treeTypeId);
    if (index > -1) this._stsTrees.splice(index, 1);
};

Game_Actor.prototype.resetAllTree = function() {
    var totalSp = 0;
    this.getTreeTypes().forEach( function(tType) {
        totalSp += this.resetTree(tType);
    },this);
    return totalSp;
};

Game_Actor.prototype.resetTree = function(treeType) {
  var totalSp = 0;
  var datas = this.getTreeDatas(treeType);
  if (!datas.length) return 0;
  datas.forEach( function(data) {
    if (!data) return;
    var skill = this.stsSkill(data.id);
    totalSp += this.stsUsedSp(skill.id);
    this.forgetSkill(data.id);
    this.resetStsSkill(data.id);
  },this);
  return totalSp;
};

Game_Actor.prototype.totalUsedSp = function(skill) {
    var totalSp = 0;
    var skill = this.stsSkill(skillId);
    FTKR.setGameData(this, null, skill);
    for (var c = 0; c < this.stsCount(skill.id); c++) {
        totalSp += this.evalStsFormula(skill.sts.costs[0].value, 0, 0);
    };
    return totalSp;
};

Game_Actor.prototype.getTreeDatas = function(treeType) {
  var tree = $dataWeapons[treeType];
  return tree ? this.getSkillTree(tree) : [false];
};

Game_Actor.prototype.isShowItem = function(item, tree) {
    FTKR.setGameData(this, null, item);
    return this.evalStsFormula(item.sts.show, true, false) &&
        this.getPreskillId(item.id, tree.id).every(function(skillId){
            var skill = this.stsSkill(skillId);
            FTKR.gameData.item = skill;
            return this.evalStsFormula(skill.sts.show, true, false);
        },this);
};

Game_Actor.prototype.getSkillTree = function(tree) {
    var results = [];
    var list = tree.sts.skillIds;
    var nextlist = [];
    var count = 0;
    while (count < FTKR.STS.MAX_DEVSKILL_COUNT) {
        dupCount = 0;
        var text = '';
        for (var i = 0; i < FTKR.STS.skillTree.maxCols - dupCount; i++) {
            var id = list[i];
            if (!id) {
                results.push(null);
            } else {
                var item = this.stsSkill(id);
                if (item.sts.position > count + 1) {
                    results.forEach( function(result, t){
                        if (result && result.id === id) results.splice(t, 1, null);
                    });
                    results.push(null);
                    nextlist.addExceptForDup([id]);
                } else {
                    var diffX = item.sts.diffX;
                    if (diffX) {
                        for (var d = 0; d < diffX; d++) {
                            results.push(null);
                            dupCount++;
                       }
                    }
                    FTKR.setGameData(this, null, item);
                    if (this.evalStsFormula(item.sts.show, true)) {
                        var skillIds = this.getDevSkillId(item, tree);
                        var data = { id:id, next:skillIds, x:i + dupCount, y:count };
                        results.forEach( function(result, t){
                            if (result && result.id === data.id) results.splice(t, 1, null);
                        });
                        results.push(data);
                        nextlist.addExceptForDup(data.next);
                    } else {
                        results.push(null);
                    }
                }
            }
        }
        if (!nextlist.length) break;
        list = nextlist;
        nextlist = [];
        count++;
    }
    return results;
};

Game_Actor.prototype.getDevSkillId = function(item, tree) {
    var skillIds = item.sts.skillIds;
    if (item.sts.tree.length > 1) {
      var derives = item.sts.tree.filter( function(treeType) {
        return treeType.treeId === tree.id;
      });
      if (derives.length) skillIds = derives[0].skillIds;
    }
    return skillIds;
};

//前提スキルのIDリストを取得
Game_Actor.prototype.getPreskillId = function(skillId, tTypeId) {
    var results = [];
    var tree = $dataWeapons[tTypeId];
    $dataSkills.forEach( function(skill) {
        if (skill) {
            var derives = this.getDevSkillId(skill, tree);
            if (derives.length) {
                var num = derives.filter( function(id) {
                    return id === skillId; 
                }).length;
                if (num) results.push(skill.id);
            }
        }
    },this);
    return results;
};

Game_Actor.prototype.isReqSkillOk = function(skillId, tTypeId) {
    return !this.getPreskillId(skillId, tTypeId).filter( function(id) {
        return !this.isStsLearnedSkill(id);
    },this).length;
};

//=============================================================================
// Game_Action
//=============================================================================

FTKR.STS.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
Game_Action.prototype.applyItemEffect = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_GET_SP:
            this.itemEffectGetSp(target, effect);
            break;
        case Game_Action.EFFECT_RESET_TREE:
            this.itemEffectResetTree(target, effect);
            break;
        case Game_Action.EFFECT_CLEAR_TREE:
            this.itemEffectClearTree(target, effect);
            break;
    }
    FTKR.STS.Game_Action_applyItemEffect.call(this, target, effect);
};

Game_Action.prototype.itemEffectGetSp = function(target, effect) {
    var value = effect.value2;
    if (value !== 0) {
        target.getSp(value);
        this.makeSuccess(target);
    }
};

Game_Action.prototype.itemEffectResetTree = function(target, effect) {
    target.getSp(target.resetAllTree());
    this.makeSuccess(target);
};

Game_Action.prototype.itemEffectClearTree = function(target, effect) {
    target.resetAllTree();
    this.makeSuccess(target);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.stsSp = function() {
    return (this.enemy().note.match(/<(?:STS GET SP):[ ]*(\d+)>/i) || 
        this.enemy().note.match(/<(?:STS SP 入手):[ ]*(\d+)>/i))? Number(RegExp.$1) : 0;
};

Game_Enemy.prototype.stsCount = function(skillId) {
    return 0;
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.stsSpTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.stsSp();
    }, 0);
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.setLearnSound = function() {
    var sts = FTKR.STS.stsSe;
    this._learnSound = {name:sts.name, volume:sts.volume, pitch:sts.pitch, pan:sts.pan};
};

Window_Base.prototype.setSkillId = function(skillId) {
    if (this._skillId === skillId) return;
    this._skillId = skillId;
    this.refresh();
};

if (Imported.FTKR_CSS) {
FTKR.STS.Window_Bas_drawCssActorStatusBase =
    Window_Base.prototype.drawCssActorStatusBase;
Window_Base.prototype.drawCssActorStatusBase = function(index, actor, x, y, width, status, lss) {
    switch (status) {
        case 'sp': this.drawCssActorSp(actor, x, y, width); return 1;
    }
    return FTKR.STS.Window_Bas_drawCssActorStatusBase.call(this,
        index, actor, x, y, width, status, lss);
};
}

Window_Base.prototype.drawCssActorSp = function(actor, x, y, width) {
    this.changeTextColor(this.systemColor());
    this.drawText(FTKR.STS.sp.dispName, x, y, width);
    this.resetTextColor();
    this.drawText(actor.stsSp(), x, y, width, 'right');
};

//アクター名、スキル名が使用できるタイトル文を表示する関数
Window_Base.prototype.drawStsDescTitle = function(format, x, y, width, skill) {
    var name = skill ? skill.name : '';
    var params = [this._actor._name, name];
    this.drawFormatTextEx(format, x, y, params, width);
};

//スキルの説明文を表示する関数
Window_Base.prototype.drawStsDescription = function(x, y, width, skill) {
    var texts = this.getStsDesc(skill).split('\n');
    var dy = this.lineHeight();
    for (var i = 0; i < texts.length; i++) {
        if (FTKR.STS.skillStatus.adjustWidth) {
            this.drawStsFormatText(texts[i], x, y + dy * i, [], width);
        } else {
            this.drawFormatTextEx(texts[i], x, y + dy * i, []);
        }
    }
};

//スキルの説明文を取得する関数
Window_Base.prototype.getStsDesc = function(skill) {
    if (Imported.FTKR_SEP) {
        var actor = $gameActors.actor(skill.actorId);
        if (!actor) return skill.description;
        var descs = skill.descs.filter( function(desc) {
            return actor.evalEnabledFormula(desc.enabled, skill);
        });
        var desc = descs.pop();
        return desc ? desc.description : '';
    } else {
        return skill.description;
    }
};

/*-------------------------------------------------------------
  コストデータ(アイコン,名前,必要数,手持ち数)を表示する関数
-------------------------------------------------------------*/
Window_Base.prototype.setCost = function(icon, name, base) {
    return {icon:icon, name:name, base:base};
};

Window_Base.prototype.setStsCost = function(cost) {
    switch(cost.type) {
        case 'gold':
            return this.setCost(FTKR.STS.icon.gold, $dataSystem.currencyUnit, $gameParty.gold());
        case 'item':
            var item = $dataItems[cost.id];
            return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
        case 'var'://変数
            return this.setCost(FTKR.STS.icon.var, $dataSystem.variables[cost.id], $gameVariables.value(cost.id));
        case 'weapon':
            var item = $dataWeapons[cost.id];
            return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
        case 'armor':
            var item = $dataArmors[cost.id];
           return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
        case 'sp':
            return this.setCost(FTKR.STS.sp.icon, FTKR.STS.sp.dispName, this._actor.stsSp());
        default:
            return this.setCost(0, '', 0);
    }
};

//斜線描画関数
Window_Base.prototype.drawDiagLine = function(x1, y1, x2, y2, color, thick) {
    this.contents.drawLine(x1, y1, x2, y2, this.textColor(color), thick);
};

//アイコンの表示スケールを指定できる表示関数
Window_Base.prototype.drawIconCustom = function(iconIndex, x, y, scale) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
};

// 制御文字を使えるフォーマットテキスト描画関数
Window_Base.prototype.drawStsFormatText = function(fmt, x, y, params, width, position) {
    var text = fmt.format(params[0], params[1], params[2], params[3], params[4]);
    this.drawText(text, x, y, width, position);
};

// 制御文字を使えるフォーマットテキスト描画関数
Window_Base.prototype.drawFormatTextEx = function(fmt, x, y, params) {
    var text = fmt.format(params[0], params[1], params[2], params[3], params[4]);
    return this.drawTextEx(text, x, y);
};

/*-------------------------------------------------------------
  制御文字の表示処理の修正
-------------------------------------------------------------*/
FTKR.STS.Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'LW':
        this.processDrawStsWidth(this.obtainEscapeStsParam(textState), textState);
        break;
    default:
        FTKR.STS.Window_Base_processEscapeCharacter.call(this, code, textState);
        break;
    }
};

Window_Base.prototype.obtainEscapeStsParam = function(textState) {
    var arr = /^\[([^\]]+)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        var results = arr[1].split(',');
        return results.map( function(elm) {
            return isNaN(parseInt(elm)) ? elm : parseInt(elm);
        });
    } else {
        return '';
    }
};

Window_Base.prototype.processDrawStsWidth = function(args, textState) {
    this.drawText(args[1], textState.x, textState.y, args[0], args[2]);
    textState.x += args[0];
};

//=============================================================================
// Window_Selectable
//=============================================================================

Window_Selectable.prototype.actSelect = function(index) {
    this.activate();
    this.select(index);
    this.refresh();
};

Window_Selectable.prototype.itemHeightSpace = function() {
    return 0;
};

Window_Selectable.prototype.unitHeight = function() {
    return this.itemHeight() + this.itemHeightSpace();
};

Window_Selectable.prototype.unitWidth = function() {
    return this.itemWidth() + this.spacing();
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

FTKR.STS.Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    FTKR.STS.Window_MenuCommand_addOriginalCommands.call(this);
    if (FTKR.STS.showCommand === 1) {
        if (FTKR.STS.menuSwitchId === 0) {
            this.addCommand(FTKR.STS.commandName, 'learn skill', true);
        } else if (FTKR.STS.menuSwitchId > 0 &&
            $gameSwitches.value(FTKR.STS.menuSwitchId)) {
            this.addCommand(FTKR.STS.commandName, 'learn skill', true);
        }
    }
};

//=============================================================================
// Window_TreeType
//=============================================================================

function Window_TreeType() {
  this.initialize.apply(this, arguments);
}

Window_TreeType.prototype = Object.create(Window_Selectable.prototype);
Window_TreeType.prototype.constructor = Window_TreeType;

Window_TreeType.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._stypeId = 0;
    this.refresh();
};

Window_TreeType.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.resetScroll();
    }
};

Window_TreeType.prototype.maxCols = function() {
    return 1;
};

Window_TreeType.prototype.maxItems = function() {
    return this._data ? this._data.length : 0;
};

Window_TreeType.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_TreeType.prototype.item = function(index) {
    return this._data ? this._data[index] : null;
};

Window_TreeType.prototype.includes = function(weaponId) {
    var weapon = $dataWeapons[weaponId];
    FTKR.setGameData(this._actor, null, weapon);
    return weapon && weapon.wtypeId === FTKR.STS.skillTreeId &&
        this._actor.evalStsFormula(weapon.sts.required, true, false);
};

Window_TreeType.prototype.makeItemList = function() {
    this._data = [];
    var actor = this._actor;
    if (actor) {
        this._data = actor.getTreeTypes().filter( function(id) {
            return this.includes(id);
        },this);
    }
};

Window_TreeType.prototype.drawItem = function(index) {
  if (this._actor) {
    var rect = this.itemRect(index);
    this.changeTextColor(this.systemColor());
    this.changePaintOpacity(true);
    var item = $dataWeapons[this.item(index)];
    if (item) {
      this.drawStsFrame(index, item);
      this.drawItemName(item, rect.x, rect.y, rect.width - 3);
    }
    this.changePaintOpacity(true);
  }
};

Window_TreeType.prototype.drawStsFrame = function(index, item) {
  if (Imported.FTKR_DCF && FTKR.STS.treeTypes.enabled) {
    var defIndex = item ? item.sts.pIndex : 0;
    var csrIndex = item ? item.sts.pCIndex : 0;
    var item = {
      defColor:0,
      csrColor:0,
      defIndex:defIndex,
      csrIndex:csrIndex,
    };
    this.drawDcfFrame(index, false, false, item);
  }
};

Window_TreeType.prototype.setSkillTreeWindow = function(window) {
  this._skillTreeWindow = window;
  this.update();
};

Window_TreeType.prototype.setPreskillWindow = function(window) {
  this._preskillWindow = window;
  this.update();
};

Window_TreeType.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  var tTypeId = this.item(this.index());
  if (tTypeId && this._skillTreeWindow) this._skillTreeWindow.setTtypeId(tTypeId);
  if (tTypeId && this._preskillWindow) this._preskillWindow.setTtypeId(tTypeId);
};

Window_TreeType.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    if (Imported.FTKR_DCF && FTKR.STS.treeTypes.enabled) this.updateDcfFrame(index, FTKR.STS.frame);
};

//=============================================================================
// Window_SkillTree
//=============================================================================

function Window_SkillTree() {
  this.initialize.apply(this, arguments);
}

Window_SkillTree.prototype = Object.create(Window_Selectable.prototype);
Window_SkillTree.prototype.constructor = Window_SkillTree;

Window_SkillTree.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.defineLearnSound();
  this._actor = null;
  this._data = [];
  this.clearWindow();
};

Window_SkillTree.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.clearWindow();
    this.resetScroll();
  }
};

Window_SkillTree.prototype.clearWindow = function() {
  this._stsIndex = 0;
  this._tTypeId = null;
  this._skillId = null;
  this.refresh();
};

Window_SkillTree.prototype.maxCols = function() {
  return Math.max(FTKR.STS.skillTree.maxCols, 1);
};

Window_SkillTree.prototype.itemWidth = function() {
    return FTKR.STS.sFrame.width;
};

Window_SkillTree.prototype.itemHeight = function() {
    return FTKR.STS.sFrame.height;
};

Window_SkillTree.prototype.wSpacing = function() {
    return Math.max(FTKR.STS.cFrame.offsetX + FTKR.STS.cFrame.width, 0);
};

Window_SkillTree.prototype.spacing = function() {
    var allSpacing = this.width - this.padding * 2 - this.wSpacing() - this.itemWidth() * this.maxCols();
    return allSpacing / (this.maxCols() - 1);
};

Window_SkillTree.prototype.itemHeightSpace = function() {
    return FTKR.STS.skillTree.heightSpace;
};

Window_SkillTree.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_SkillTree.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_SkillTree.prototype.isCurrentItemEnabled = function() {
  return FTKR.STS.enableConf ? this.item() : this.isLearnOk(this.item());
};

Window_SkillTree.prototype.isLearnOk = function(item) {
  return item && this.isEnabled(item) && this._actor.isStsLearnedOk(item.id);
};

Window_SkillTree.prototype.isEnabled = function(item) {
  return item && this.isReqSkillOk(item) && this.isReqParamOk(item) && this.isPayCostOk(item);
};

Window_SkillTree.prototype.isPayCostOk = function(item) {
  return this._actor.isPayCostOk(item.id);
};

Window_SkillTree.prototype.isReqSkillOk = function(item) {
    return this._actor.isReqSkillOk(item.id, this._tTypeId);
};

Window_SkillTree.prototype.isReqParamOk = function(item) {
  return this._actor.isReqParamOk(item.id);
};

Window_SkillTree.prototype.isShowItem = function(item) {
  return item && (this.isEnabled(item) || this._actor.isStsLearnedSkill(item.id));
};

Window_SkillTree.prototype.makeItemList = function() {
  this._data = [];
  var actor = this._actor;
  if (actor && this._tTypeId) this._data = actor.getTreeDatas(this._tTypeId);
};

Window_SkillTree.prototype.checkId = function(list, id) {
  return list.filter( function(data) {
    return data && data.id === id;
  });
};

Window_SkillTree.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  var rx = rect.x;
  var ry = rect.y;
  var rw = rect.width;
  var rh = rect.height;
  var data = this._data[index];
  if (!data ) return false;
  var fcolor = this.setFrameColor(data);
  var nextList = data.next;
  var skill = this._actor.stsSkill(data.id);
  var iw = Window_Base._iconWidth;
  if (skill) {
    this.changePaintOpacity(this.isShowItem(data));
    this.drawTreeLine(data, nextList, rx, ry, rw, rh);
    this.drawStsFrame(index, skill, data);
    var ssi = FTKR.STS.sFrame.icon;
    this.drawIcon(skill.iconIndex, rx + ssi.offsetX, ry + ssi.offsetY);
    this.drawSkillCount(skill, data, rx, ry, rw, fcolor);
    this.drawSkillText(skill, rx, ry, rw, fcolor, FTKR.STS.sFrame.text);
    this.changeTextColor(this.textColor(0));
    this.changePaintOpacity(1);
  }
};

Window_SkillTree.prototype.drawStsFrame = function(index, skill, data) {
    if (!FTKR.STS.sFrame.enabled) return;
    var fColor = data ? this.setFrameColor(data) : 0;
    var rect = this.itemRect(index);
    if (Imported.FTKR_DCF) {
        this.drawDcfFrame(index, rect, skill, FTKR.STS.sFrame.type, fColor);
    } else {
        this.drawFrame(rect.x, rect.y, rect.width, rect.height, fColor, FTKR.STS.treeLineThick);
    }
};

Window_SkillTree.prototype.drawDcfFrame = function(index, rect, skill, type, color) {
    var onCursor = index === this.index();
    var defIndex = skill ? skill.sts.pIndex : 0;
    var csrIndex = skill ? skill.sts.pCIndex : 0;
    var item = {
        defColor:color,
        csrColor:0,
        defIndex:defIndex,
        csrIndex:csrIndex,
    };
    this.drawDcfFrameBase(FTKR.DCF.frame, rect, onCursor, item, type);
};

Window_SkillTree.prototype.drawFrame = function(x, y, width, height, colorNum, thick) {
  if (colorNum < 0) return false;
  var color = this.textColor(colorNum);
  this.contents.drawFrame(x, y, width, height, thick, color);
};

Window_SkillTree.prototype.drawSkillText = function(skill, x, y, width, color, sts) {
  var stx = sts.offsetX;
  this.changeTextColor(this.textColor(color));
  this.drawFormatTextEx(sts.format, x + stx, y + sts.offsetY, [skill.name]);
};

//スキルの習得回数を表示
Window_SkillTree.prototype.drawSkillCount = function(skill, data, x, y, width, color){
  var actor = this._actor;
  var iw = Window_Base._iconWidth;
  var ih = Window_Base._iconHeight;
  var cfl = FTKR.STS.cFrame;
  var scw = cfl.width;
  var sch = cfl.height;
  var scx = x + width + cfl.offsetX;
  var scy = y + cfl.offsetY;
  var thick = cfl.thick;
  var txtw = scw - thick*2;
  var txth = sch - thick*2;
  var rate = sch / iw;
  var sctx = scx + thick + cfl.count.offsetX;
  var scty = scy + thick + cfl.count.offsetY;
  var count = !actor.isStsLearnedSkill(skill.id) ? 0 : actor.stsCount(skill.id);
  if (FTKR.STS.enableSkillCount) {
    if (cfl.enabled) {
      var fcolor = this.setFrameColor(data);
      if (Imported.FTKR_DCF) {
        var rect = {x:scx, y:scy, width:scw, height:sch};
        var item = {defColor:fcolor,defIndex:cfl.defIndex};
        this.drawDcfFrameBase(FTKR.DCF.frame, rect, false, item, cfl.type);
      } else {
        this.drawFrame(scx, scy, scw, sch, fcolor, thick);
      }
    }
    this.changeTextColor(this.textColor(color));
    this.drawFormatTextEx(cfl.format, sctx, scty, [count]);
  }
  if (actor.isStsLearnedSkill(skill.id) && !actor.isStsLearnedOk(skill.id)) {
    this.drawIconCustom(FTKR.STS.skillLearnedIcon, scx, scy, rate);
  }
};

//スキル間の派生線を表示
Window_SkillTree.prototype.drawTreeLine = function(data, nextList, x, y, width, height) {
  if (nextList.length) {
    var rw = width;   //スキル枠の幅
    var rh = height;  //スキル枠の高さ
    var ic = {x:x + rw/2, y:y + rh};//派生元座標

    for (var i = 0; i < nextList.length; i++) {
      var next = this.checkId(this._data, nextList[i])[0];
      if (next) {
        var color = FTKR.STS.lineColor ? this.setFrameColor(next) : 0;
        var hs = this.itemHeightSpace();  //縦のスキル枠間の距離
        var ncx = x + rw/2 + (rw + this.spacing()) * (next.x - data.x);//派生先X座標
        var ncy = y + (rh + hs) * (next.y - data.y);//派生先Y座標
        var ccy = ncy - hs/2;
        var tlen = hs/2 * Math.code(next.x, data.x);
        var thick = FTKR.STS.treeLineThick;
        if (FTKR.STS.drawLineType) {
          if (FTKR.STS.drawLineType === 2) {
            this.drawTreeLineBase(ic.x,        ic.y,        ic.x + tlen, ic.y + hs/2, color, thick);
            this.drawTreeLineBase(ic.x + tlen, ic.y + hs/2, ncx - tlen,  ic.y + hs/2, color, thick);
            this.drawTreeLineBase(ncx - tlen,  ic.y + hs/2, ncx,         ic.y + hs, color, thick);
            this.drawTreeLineBase(ncx,         ic.y + hs,   ncx,         ncy, color, thick);
          } else {
            this.drawTreeLineBase(ic.x, ic.y, ic.x, ncy - hs, color, thick);
            this.drawTreeLineBase(ic.x, ncy - hs, ic.x + tlen, ccy, color, thick);
            this.drawTreeLineBase(ic.x + tlen, ccy, ncx - tlen, ccy, color, thick);
            this.drawTreeLineBase(ncx - tlen, ccy, ncx, ncy, color, thick);
          }
        } else {
          this.drawTreeLineBase(ic.x, ic.y, ncx, ncy, color, thick);
        }
      }
    }
  }
};

Window_SkillTree.prototype.drawTreeLineBase = function(x, y, w, h, color, thick) {
  if (FTKR.STS.addFrameToLine) this.drawDiagLine(x, y, w, h, 15, thick + 2);
  this.drawDiagLine(x, y, w, h, color, thick);
};

Window_SkillTree.prototype.setFrameColor = function(data) {
  var sts = FTKR.STS.sFrame.color;
  if (this._actor.isStsLearnedSkill(data.id)) {
    return sts.isLearned;
  } else if (this.isLearnOk(data)) {
    return sts.isLearnOk;
  } else if (!this.isReqSkillOk(data)) {
    return sts.isReqSkillNg;
  } else {
    return sts.isReqNg;
  }
};

Window_SkillTree.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_SkillTree.prototype.setTtypeId = function(tTypeId) {
  if (this._tTypeId === tTypeId) return;
  this._tTypeId = tTypeId;
  this.refresh();
};

Window_SkillTree.prototype.defineLearnSound = function() {
  this.setLearnSound();
};

Window_SkillTree.prototype.setStatusTitleWindow = function(window) {
  this._stsStatusTitleWindow = window;
  this.update();
};

Window_SkillTree.prototype.setConfWindow = function(window) {
  this._confWindow = window;
  this.update();
};

Window_SkillTree.prototype.setCostWindow = function(window) {
  this._costWindow = window;
  this.update();
};

Window_SkillTree.prototype.setPreskillWindow = function(window) {
  this._preskillWindow = window;
  this.update();
};

Window_SkillTree.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  this._skillId = this.item() ? this.item().id : null;
  if (this._stsStatusTitleWindow) this._stsStatusTitleWindow.setSkillId(this._skillId);
  if (this._confWindow) this._confWindow.setEnabled(this.isLearnOk(this.item()));
  if (this._costWindow) this._costWindow.setSkillId(this._skillId);
  if (this._preskillWindow) this._preskillWindow.setSkillId(this._skillId);
};

Window_SkillTree.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    if (Imported.FTKR_DCF && FTKR.STS.sFrame.enabled) this.updateDcfFrame(index);
};

Window_SkillTree.prototype.maxPageRows = function() {
    var pageHeight = this.height - this.padding * 2;
    return Math.floor(pageHeight / this.unitHeight());
};

Window_SkillTree.prototype.topRow = function() {
    return Math.floor(this._scrollY / this.unitHeight());
};

Window_SkillTree.prototype.setTopRow = function(row) {
    var scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        this.updateCursor();
    }
};

Window_SkillTree.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * this.unitWidth() - this._scrollX;
    rect.y = Math.floor(index / maxCols) * this.unitHeight() - this._scrollY;
    return rect;
};

//=============================================================================
// Window_StsSkillStatus
//=============================================================================

function Window_StsSkillStatus() {
  this.initialize.apply(this, arguments);
}

Window_StsSkillStatus.prototype = Object.create(Window_Base.prototype);
Window_StsSkillStatus.prototype.constructor = Window_StsSkillStatus;

Window_StsSkillStatus.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this.clearWindow();
};

Window_StsSkillStatus.prototype.setActor = function(actor) {
  if (this._actor !== actor) this._actor = actor;
};

Window_StsSkillStatus.prototype.clearWindow = function() {
  this._skillId = null;
  this.refresh();
};

Window_StsSkillStatus.prototype.refresh = function() {
  this.contents.clear();
  var sts = FTKR.STS.skillStatus;
  this.drawSkillState(sts.titleFormat);
};

Window_StsSkillStatus.prototype.drawSkillState = function(format) {
  if (this._actor && this._skillId) {
    var skill = this._actor.stsSkill(this._skillId);
    var y = this.lineHeight();
    var width = this.width - this.padding * 2;
    format ? this.drawStsDescTitle(format, 0, 0, width, skill) : y = 0;
    this.drawStsDescription(0, y, width, skill);
  }
};

//=============================================================================
// Window_StsConfTitle
//=============================================================================

function Window_StsConfTitle() {
  this.initialize.apply(this, arguments);
}

Window_StsConfTitle.prototype = Object.create(Window_Base.prototype);
Window_StsConfTitle.prototype.constructor = Window_StsConfTitle;

Window_StsConfTitle.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._skillId = null;
  this.refresh();
};

Window_StsConfTitle.prototype.setActor = function(actor) {
  if (this._actor !== actor) this._actor = actor;
};

Window_StsConfTitle.prototype.refresh = function () {
  this.contents.clear();
  this.drawStsText(FTKR.STS.conf.titleformat);
};

Window_StsConfTitle.prototype.drawStsText = function(format) {
  if (this._actor && this._skillId) {
    var skill = this._actor.stsSkill(this._skillId);
    var width = this.width - this.standardPadding() * 2;
    this.drawStsDescTitle(format, 0, 0, width, skill);
  }
};

//=============================================================================
// Window_StsConf
//=============================================================================

function Window_StsConf() {
  this.initialize.apply(this, arguments);
}

Window_StsConf.prototype = Object.create(Window_Selectable.prototype);
Window_StsConf.prototype.constructor = Window_StsConf;

Window_StsConf.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.setLearnSound();
  this._actor = null;
  this._data = [];
  this._enabled = false;
  this._dicision = false;
};

Window_StsConf.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_StsConf.prototype.maxCols = function() {
    return 2;
};

Window_StsConf.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_StsConf.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_StsConf.prototype.makeItemList = function() {
  this._data = [
    {dicision:true, disp:FTKR.STS.conf.okFormat},
    {dicision:false, disp:FTKR.STS.conf.cancelFormat}
  ];
};

Window_StsConf.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_StsConf.prototype.isEnabled = function(index) {
  return this._actor && (this._enabled || index > 0);
};

Window_StsConf.prototype.isCurrentItemEnabled = function() {
  return this.isEnabled(this.index());
};

Window_StsConf.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  this.changePaintOpacity(this.isEnabled(index));
  this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
  this.changePaintOpacity(1);
};

Window_StsConf.prototype.setEnabled = function(enabled) {
  if (this._enabled === enabled) return;
  this._enabled = enabled;
  this.refresh();
};

//=============================================================================
// Window_StsCost
//=============================================================================

function Window_StsCost() {
  this.initialize.apply(this, arguments);
}

Window_StsCost.prototype = Object.create(Window_Base.prototype);
Window_StsCost.prototype.constructor = Window_StsCost;

Window_StsCost.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this.clearWindow()
};

Window_StsCost.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_StsCost.prototype.clearWindow = function() {
  this._skillId = null;
  this.refresh();
};

Window_StsCost.prototype.refresh = function() {
    this.contents.clear();
    this.drawAllCost();
};

Window_StsCost.prototype.drawAllCost = function() {
  if (this._actor) {
    var skill = this._skillId ? this._actor.stsSkill(this._skillId) : null;
    var width = this.width - this.padding * 2;
    var y = this.lineHeight();
    this.drawStsDescTitle(FTKR.STS.cost.titleFormat, 0, 0, width, skill);
    if (this._skillId) {
      for (var i = 0; i< 3; i++) {
        var cost = skill.sts.costs[i];
        if (cost) {
            FTKR.setGameData(this._actor, null, skill);
            if (FTKR.STS.sp.hideCost0 && cost.type === 'sp' && (!cost.value || Number(cost.value) === 0)) continue;
            this.drawStsCost(cost, 0, y*(1+i), width);
        }
      }
    }
  }
};

Window_StsCost.prototype.drawStsCost = function(cost, x, y, width) {
    var iw = Window_Base._iconWidth + 4;
    width = width - iw;
    this.drawIcon(this.setStsCost(cost).icon, x + 2, y + 2);
    var params = [
        this._actor.evalStsFormula(cost.value, 0, 0),
        this.setStsCost(cost).base
    ];
    this.drawFormatTextEx(FTKR.STS.cost.itemFormat, x + iw, y, [this.setStsCost(cost).name]);
    var num = FTKR.STS.cost.numberFormat.split(',');
    this.changeTextColor(this.textColor(parseInt(num[0])));
    var numberWidth = FTKR.STS.cost.numberWidth || width + iw;
    var diff = width + iw - numberWidth;
    this.drawStsFormatText(num[1], x + diff, y, params, numberWidth, 'right');
};

//=============================================================================
// Window_StsPreskill
//=============================================================================

function Window_StsPreskill() {
  this.initialize.apply(this, arguments);
}

Window_StsPreskill.prototype = Object.create(Window_Base.prototype);
Window_StsPreskill.prototype.constructor = Window_StsPreskill;

Window_StsPreskill.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this.clearWindow()
};

Window_StsPreskill.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_StsPreskill.prototype.setTtypeId = function(tTypeId) {
  if (this._tTypeId === tTypeId) return;
  this._tTypeId = tTypeId;
  this.refresh();
};

Window_StsPreskill.prototype.clearWindow = function() {
  this._skillId = null;
  this._tTypeId = null;
  this.refresh();
};

Window_StsPreskill.prototype.refresh = function() {
    this.contents.clear();
    this.drawAllPreskill();
};

Window_StsPreskill.prototype.drawAllPreskill = function(index) {
  if (this._actor) {
    var actor = this._actor;
    var skill = this._skillId ? actor.stsSkill(this._skillId) : null;
    var width = this.width - this.padding * 2;
    var y = this.lineHeight();
    this.drawStsDescTitle(FTKR.STS.preskill.titleFormat, 0, 0, width, skill);
    if (this._skillId && this._tTypeId) {
      var preskillIds = actor.getPreskillId(this._skillId, this._tTypeId);
      for (var i = 0; i< preskillIds.length; i++) {
        var preskill = actor.stsSkill(preskillIds[i]);
        if (preskill) {
          this.changePaintOpacity(actor.isStsLearnedSkill(preskill.id));
          this.drawFormatTextEx(FTKR.STS.preskill.itemFormat, 0, y*(1+i), [preskill.name], width);
          this.changePaintOpacity(1);
        }
      }
    }
  }
};

//=============================================================================
// Window_StsActorStatus
//=============================================================================

function Window_StsActorStatus() {
  this.initialize.apply(this, arguments);
}

Window_StsActorStatus.prototype = Object.create(Window_Base.prototype);
Window_StsActorStatus.prototype.constructor = Window_StsActorStatus;

Window_StsActorStatus.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
};

Window_StsActorStatus.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_StsActorStatus.prototype.refresh = function() {
  this.contents.clear();
  var sts = FTKR.STS.actorStatus;
  var actor = this._actor;
  if (actor) {
    var w = this.width - this.padding * 2;
    var h = this.height - this.padding * 2;
    if(Imported.FTKR_CSS) {
      this.drawCssActorStatus(0, actor, 0, 0, w, h, sts);
    } else {
      var y = this.lineHeight();
      this.drawActorFace(actor, 0, 0, w*2/3);
      this.drawActorName(actor, 120, 0, w - 120);
      this.drawActorLevel(actor, 120, y, w - 120);
      this.drawCssActorSp(actor, 120, y*2, w - 120);
    }
  }
};

Window_StsActorStatus.prototype.drawActorLevel = function(actor, x, y, width) {
    var value = actor.level;
    var tw = this.textWidth(String(value));
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, width - tw - 4);
    this.resetTextColor();
    this.drawText(value, x + width - tw, y, tw, 'right');
};

//=============================================================================
// Scene_Menu
//=============================================================================

FTKR.STS.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  FTKR.STS.Scene_Menu_createCommandWindow.call(this);
  if (FTKR.STS.showCommand === 1) {
    this._commandWindow.setHandler('learn skill', this.commandPersonal.bind(this));
  }
};

FTKR.STS.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
  FTKR.STS.Scene_Menu_onPersonalOk.call(this);
  switch (this._commandWindow.currentSymbol()) {
  case 'learn skill':
    SceneManager.push(Scene_STS);
    break;
  }
};

//=============================================================================
// Scene_STS
//=============================================================================

function Scene_STS() {
  this.initialize.apply(this, arguments);
}

Scene_STS.prototype = Object.create(Scene_Skill.prototype);
Scene_STS.prototype.constructor = Scene_STS;

Scene_STS.prototype.initialize = function() {
  Scene_Skill.prototype.initialize.call(this);
};

Scene_STS.prototype.create = function() {
  Scene_ItemBase.prototype.create.call(this);
  this.createHelpWindow();
  this.createStsActorStatusWindow();
  this.createTreeTypeWindow();
  this.createSkillTreeWindow();
  this.createStsSkillStatusWindow();
  if (FTKR.STS.enableConf) {
    this.createStsConfTitleWindow();
    this.createStsConfWindow();
  }
  this.createStsCostWindow();
  this.createStsPreskillWindow();
  this.refreshActor();
};

Scene_STS.prototype.createStsActorStatusWindow = function() {
  this._stsActorStatusWindow = new Window_StsActorStatus(0, 0, 240, 144);
  this.addWindow(this._stsActorStatusWindow);
};

Scene_STS.prototype.createTreeTypeWindow = function() {
  this._stsTreeTypeWindow = new Window_TreeType(0, 144, 240, 288);
  var window = this._stsTreeTypeWindow;
  window.setHelpWindow(this._helpWindow);
  window.setHandler('ok',       this.onTreeTypeOk.bind(this));
  window.setHandler('cancel',   this.popScene.bind(this));
  window.setHandler('pagedown', this.nextActor.bind(this));
  window.setHandler('pageup',   this.previousActor.bind(this));
  this.addWindow(window);
  window.actSelect(0);
};

Scene_STS.prototype.createSkillTreeWindow = function() {
  var wx = 240;
  var wy = 144;
  var ww = Graphics.boxWidth - wx;
  var wh = Graphics.boxHeight - wy;
  this._stsSkillTreeWindow = new Window_SkillTree(wx, wy, ww, wh);
  var window = this._stsSkillTreeWindow;
  window.setHelpWindow(this._helpWindow);
  window.setHandler('ok',     this.onSkillTreeOk.bind(this));
  window.setHandler('cancel', this.onSkillTreeCancel.bind(this));
  this._stsTreeTypeWindow.setSkillTreeWindow(window);
  this.addWindow(window);
};

Scene_STS.prototype.createStsSkillStatusWindow = function() {
  var wx = 240;
  var ww = Graphics.boxWidth - wx;
  this._stsStatusTitleWindow = new Window_StsSkillStatus(wx, 0, ww, 144);
  var window = this._stsStatusTitleWindow;
  this._stsSkillTreeWindow.setStatusTitleWindow(window);
  this.addWindow(window);
};

Scene_STS.prototype.createStsConfTitleWindow = function() {
  var wh = this._helpWindow.lineHeight() + this._helpWindow.standardPadding() * 2;
  this._stsConfTitleWindow = new Window_StsConfTitle(204, 120, 408, wh);
  this.addWindow(this._stsConfTitleWindow);
};

Scene_STS.prototype.createStsConfWindow = function() {
  var ctw = this._stsConfTitleWindow;
  var wx = ctw.x;
  var wy = ctw.y + ctw.height;
  var ww = ctw.width;
  var wh = this._helpWindow.lineHeight() * 1 + this._helpWindow.standardPadding() * 2;
  this._stsConfWindow = new Window_StsConf(wx, wy, ww, wh);
  var window = this._stsConfWindow;
  window.setHandler('ok', this.onConfirmationOk.bind(this));
  window.setHandler('cancel', this.onConfirmationCancel.bind(this));
  this._stsSkillTreeWindow.setConfWindow(window);
  this.addWindow(window);
};

Scene_STS.prototype.createStsCostWindow = function() {
  var wy = 432;
  var wh = Graphics.boxHeight - wy;
  this._stsCostWindow = new Window_StsCost(0, wy, 240, wh);
  var window = this._stsCostWindow;
  this._stsSkillTreeWindow.setCostWindow(window);
  this.addWindow(window);
};

Scene_STS.prototype.createStsPreskillWindow = function() {
  this._stsPreskillWindow = new Window_StsPreskill(204, 264, 408, 216);
  var window = this._stsPreskillWindow;
  this._stsTreeTypeWindow.setPreskillWindow(window);
  this._stsSkillTreeWindow.setPreskillWindow(window);
  this.addWindow(window);
};

Scene_STS.prototype.refreshActor = function() {
  var actor = this.actor();
  this._stsActorStatusWindow.setActor(actor);
  this._stsTreeTypeWindow.setActor(actor);
  this._stsStatusTitleWindow.setActor(actor);
  this._stsSkillTreeWindow.setActor(actor);
  var ctw = this._stsConfTitleWindow;
  if (ctw) {
    ctw.setActor(actor);
    ctw.hide();
  }
  var cfw = this._stsConfWindow;
  if (cfw) {
    cfw.setActor(actor);
    cfw.hide();
  }
  var csw = this._stsCostWindow;
  csw.setActor(actor);
  var psw = this._stsPreskillWindow;
  psw.setActor(actor);
  psw.hide();
};

Scene_STS.prototype.onActorChange = function() {
    this.refreshActor();
    this._stsTreeTypeWindow.actSelect(0);
};

Scene_STS.prototype.onTreeTypeOk = function() {
  this._stsSkillTreeWindow.actSelect(0);
};

Scene_STS.prototype.onSkillTreeOk = function() {
  var cfw = this._stsConfWindow;
  var stw = this._stsSkillTreeWindow;
  if (cfw) {
    var ctw = this._stsConfTitleWindow;
    ctw._skillId = stw._skillId;
    ctw.refresh();
    cfw.actSelect(0);
    this.stsConfShow();
    this._stsCostWindow.refresh();
    this._stsPreskillWindow.refresh();
  } else {
    this.stsLearnSkill(stw._skillId, stw._learnSound)
  }
};

Scene_STS.prototype.stsLearnSkill = function(skillId, sound) {
  var actor = this.actor();
  actor.stsLearnSkill(skillId);
  AudioManager.playStaticSe(sound);
  var stw = this._stsSkillTreeWindow;
  stw.actSelect(stw.index());
  this._stsActorStatusWindow.refresh();
  this._stsStatusTitleWindow.refresh();
  this._stsCostWindow.refresh();
  this._stsPreskillWindow.refresh();
};

Scene_STS.prototype.onSkillTreeCancel = function() {
  this._stsTreeTypeWindow.activate();
  this._stsSkillTreeWindow.deselect();
};

Scene_STS.prototype.onConfirmationOk = function() {
  var cfw = this._stsConfWindow;
  if (cfw.item().dicision) {
    cfw.deselect();
    this._stsConfTitleWindow.refresh();
    var stw = this._stsSkillTreeWindow;
    this.stsLearnSkill(stw._skillId, cfw._learnSound)
    this.stsConfHide();
  } else {
    this.onConfirmationCancel();
  }
};

Scene_STS.prototype.onConfirmationCancel = function() {
  this._stsConfWindow.deselect();
  var stw = this._stsSkillTreeWindow;
  stw.actSelect(stw.index());
  this.stsConfHide();
};

Scene_STS.prototype.stsConfHide = function() {
  this._stsConfWindow.hide();
  this._stsConfTitleWindow.hide();
  this._stsPreskillWindow.hide();
};

Scene_STS.prototype.stsConfShow = function() {
  this._stsConfWindow.show();
  this._stsConfTitleWindow.show();
  this._stsPreskillWindow.show();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _STS_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _STS_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'STS') {
        var com = args[0];
        var case1 = /(?:TREETYPE\()(.+)\)/i;
        var case1j = /ツリータイプ\((.+)\)/i;
        switch (true) {
            // システム画面を呼び出す
            case /OPEN/i.test(com):
            case /スキルツリー画面表示/i.test(com):
                SceneManager.push(Scene_STS);
                break;
            // SPを加算する
            // スキルツリーを追加する
            case /ADD/i.test(com):
            case /加算/i.test(com):
            case /追加/i.test(com):
                if (args[1].match(/SP\((.+)\)/i)) {
                    var value = this.setNum(RegExp.$1);
                    var actor = this.setActor(args[2]);
                    if (actor) actor.getSp(value);
                } else if (args[1].match(case1) || args[1].match(case1j)) {
                    var treeTypeId = this.setNum(RegExp.$1);
                    var actor = this.setActor(args[2]);
                    if (actor) actor.addTreetype(treeTypeId);
                }
                break;
            // スキル習得回数を取得する
            case /GET/i.test(com):
            case /習得回数取得/i.test(com):
                if (!args[1].match(/VARCOUNT\((.+)\)/i) && !args[1].match(/変数\((.+)\)/i)) break;
                var varId = this.setNum(RegExp.$1);
                if (!varId) break;
                var actor = this.setActor(args[2]);
                if (!actor) break;
                var skillId = this.setSkillId(args[3]);
                if (skillId) {
                    var skill = actor.stsSkill(skillId);
                    if (skill) $gameVariables.setValue(varId, actor.stsCount(skill.id));
                }
                break;
            // スキルツリーを初期化する
            case /RESET/i.test(com):
            case /リセット/i.test(com):
            case /CLEAR/i.test(com):
            case /初期化/i.test(com):
                var actor = this.setActor(args[1]);
                if (!actor) break;
                var sp = 0;
                if (args[2].match(/ALL/i) || args[2].match(/すべて/i)) {
                  sp = actor.resetAllTree();
                } else if (args[2].match(case1) || args[2].match(case1j)) {
                  sp = actor.resetTree(this.setNum(RegExp.$1));
                }
                if (/RESET/i.test(com) || /リセット/i.test(com)) actor.getSp(sp);
                break;
            case /Learn/i.test(com):
            case /スキル習得/i.test(com):
                var actor = this.setActor(args[1]);
                if (!actor) break;
                var skillId = this.setSkillId(args[2]);
                if (skillId && actor.canStsLearnedSkill(skillId)) {
                    actor.stsLearnSkill(skillId);
                }
                break;
            // スキルツリーを削除する
            case /REDUCE/i.test(com):
            case /削除/i.test(com):
                if (args[1].match(case1) || args[1].match(case1j)) {
                    var treeTypeId = this.setNum(RegExp.$1);
                    var actor = this.setActor(args[2]);
                    if (actor) actor.reduceTreetype(treeTypeId);
                }
                break;
        }
    }
};

Game_Interpreter.prototype.setNum = function(data) {
    if (data.match(/v\[(\d+)\]/i)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (data.match(/(\d+)/i)) {
        return Number(RegExp.$1);
    } else {
        return 0;
    }
};

Game_Interpreter.prototype.setActor = function(arg) {
    var case1 = /ACTOR\((.+)\)/i;
    var case1j = /アクター\((.+)\)/i;
    if (arg.match(case1) || arg.match(case1j)) {
        return $gameActors.actor(this.setNum(RegExp.$1));
    } else {
        return false;
    }
};

Game_Interpreter.prototype.setSkillId = function(arg) {
    var case2 = /SKILL\((.+)\)/i;
    var case2j = /スキル\((.+)\)/i;
    if (arg.match(case2) || arg.match(case2j)) {
        return this.setNum(RegExp.$1);
    } else {
        return false;
    }
};

//=============================================================================
// Utility
//=============================================================================

//引数の要素の中の重複部分を削除する。
FTKR.Utility.duplicateDelete = function(list) {
  var newlist = list.filter( function(x, i, self) {
      return self.indexOf(x) === i;
  });
  return newlist;
};