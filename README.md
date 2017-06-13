# adapt-linear-animation  

**adapt-linear-animation** is an Adapt presentation component that displays images and/or the text one by one. **linear-animation** simply presents text/images in a linear way on the page. The image frame can have jpg/png/gif and the text can be wrapped by markup element.

<img src="assets/adapt-linear-animation.png" alt="Sample linear animation frame">

Collaborators are welcome for pull request.

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `linear-animation`.

**_animation** (boolean): Whether animation required or not.

**_delay** (string): Time interval between display of 2 images in milliseconds.

**_bg** (string): Background image reference. v0.0.1 requires it to display component correctly in responsive.

**_items** (array): Each *item* represents one choice for the animation frames and contains values for **text** and **_graphic**.

### Limitations

Won't work in IE8. 

### Browser/platform specification

Intended to develop standard Adapt browser/devices specifications. Tested in Chrome 57.0.2987.133, Firefox 52.0.2 (32-bit), IE Edge, iOS 10.3.1 (Chrome and Safari).

----------------------------
**Version number:**  0.0.3 
**Framework versions:** 2.0.15  
**Accessibility support:** WAI AA    
**Author / maintainer:** Kunj B Sharma <kunjsharma@hotmail.com>    
