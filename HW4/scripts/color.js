function Color (r, g, b, a) {
     this.channels = [Math.round(r), Math.round(g), Math.round(b), a == null ? a : Math.round(a)];
}

Color.prototype = {
     get r() {
          return this.channels[0];
     },
     get g() {
          return this.channels[1];
     },
     get b() {
          return this.channels[2];
     },
     get a() {
          return this.channels[3];
     },
     get hasAlpha() {
          return this.channels[3] != null;
     },
     get length () {
          return this.hasAlpha ? 4 : 3;
     },
}

Color.prototype.toString = function () {
     var colorAsString;
     if (this.hasAlpha) {
          colorAsString = "rgba(";
     } else
          colorAsString = "rgb(";
     for (var i = 0; i < this.length; i++) {
         colorAsString += this.channels[i];
         if (i < this.length - 1) {
               colorAsString += ", ";
         }
     }
     return colorAsString + ")";
}
