//
export const FPS = 30; // frames per second
export const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)

//
export const GAME_LIVES = 3; // staring number of lives

//
export const LASER_DIST = 0.6; // max distance Laser can travel as fraction of screen width
export const LASER_MAX = 10; // maximum number of lasers on screen at once
export const LASER_SPD = 500; // speed of lasers in pixeld per second
export const LASER_EXPLODE_DUR = 0.1; // duration of the lasers explosion in seconds 

//
export const ENEMIES_JAG = 0.2; // jaggedness of the Enemy (0 = none, 1 = lots)
export const ENEMIES_SIZE = 100; // stargin size of Enemy in pixels
export const ENEMIES_SPD = 50; // max starting speed of Enemy in pixelds per second
export const ENEMIES_NUM = 1; // stargin number of Enemy
export const ENEMIES_VERT = 10; // average numb er of vertiuces on each Enemy

//
export const SHIP_BLINK_DUR = 0.1; // duration of the Player blink during invisibility in second
export const SHIP_EXPLODE_DUR = 0.3; // duration of the Player explosion
export const SHIP_INV_DUR = 3; // duration of the Player' invisibility second
export const SHIP_SIZE = 30; // Player height in pixels
export const SHIP_TURN_SPD = 360; // turn speed in degree second
export const SHIP_THRUST = 5; // acceletation of the Player in pixels per second per second

//
export const SHOW_BOUNDING = false; // show or hide collision bounding
export const SHOW_CENTRE_DOT = false; // show or hide Player's centre dot

//
export const TEXT_FADE_TIME = 2.5; // text fade time in seconds
export const TEXT_SIZE = 40; // text font height in pixels

export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");
