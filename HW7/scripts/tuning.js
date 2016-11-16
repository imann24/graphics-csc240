/**
 * @author: Isaiah Mann
 * @desc: Defines the tuning variables for the game
 * @see: Planet Stats: http://www.scalesolarsystem.66ghz.com/?i=1
 */

/* Sun Size Scale: 1 Unit = 2,000km --> Sun drawn smaller to make planets more visible
 * Planet / Moon Size Scale: 1 Unit = 100km
 * Planet Distance Scale: 1 Unit = 90,000km
 * Moon Distance Scale: 1 Unit = 6,300,000km
 * Planet Orbit Speed Scale 1 Unit = 10,000,000mph
 * Moon Orbit Speed Scale 1 Unit = 1,000,000,000,000mph
 */

// Player:
var playerSpeed = 200;
var playerStrafeSpeed = 100;
var playerLookSpeed = 0.01;
var worldObjectScale = 1;

// Sun:
var sunRadius = 348;
var sunColor = "gold";
var sunOpacity = 0.1;
var sunBrightness = 100000;
var sunDistance = 0;
// Mercury:
var mercuryRadius = 24;
var mercuryDistanceFromSun = 643.72222222;
var mercuryOrbitSpeed = 0.0107082;
var mercuryColor = "grey";

// Venus
var venusRadius = 60.5;
var venusDistanceFromSun = 1081.1;
var venusOrbitSpeed = 0.0078337;
var venusColor = "moccasin";

// Earth:
var earthRadius = 63.5;
var earthDistanceFromSun = 1201.2222222;
var earthOrbitSpeed = 0.0066616;
var earthColor = "blue";

// Earth's Moon:
var moonRadius = 17.375;
var moonDistanceFromEarth = 74.744444446;
var moonOrbitSpeed = 0.022861489;
var moonColor = "grey";

// Mars:
var marsRadius = 33.5;
var marsDistanceFromSun = 2531.5555556;
var marsOrbitSpeed = 0.0053859;
var marsColor = "lightsalmon";

// Jupiter:
var jupiterRadius = 714.5;
var jupiterDistanceFromSun = 4323;
var jupiterOrbitSpeed = 0.0029236;
var jupiterColor = "rosybrown";

// Saturn:
var saturnRadius = 582.19;
var saturnDistanceFromSun = 15855.555556;
var saturnOrbitSpeed = 0.0021676;
var saturnColor = "wheat";

// Uranus
var uranusRadius = 234.7;
var uranusDistanceFromSun = 31892.222222;
var uranusOrbitSpeed = 0.0015234;
var uranusColor = "darkturquoise";

// Neptune
var neptuneRadius = 227;
var neptuneDistanceFromSun = 49998.888889;
var neptuneOrbitSpeed = 0.0012147;
var neptuneColor = "mediumblue";

// Pluto
var plutoRadius = 11;
var plutoDistanceFromSun = 65700;
var plutoOrbitSpeed = 0.0010438;
var plutoColor = "sandybrown";
