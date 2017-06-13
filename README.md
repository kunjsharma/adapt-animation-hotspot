# adapt-animation-hotspot  

**adapt-animation-hotspot** A component that have images and hotspots over that enables a user to click and display a detailed popup.

<img src="" alt="">

Development of this component is under progress.

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `animation-hotspot`.

**_animation** (boolean): Whether animation required or not.

**_delay** (string): Time interval between display of 2 images in milliseconds.

**_navigation** (string): linear or random.

**_bg** (string): Background image reference. v0.0.1 requires it to display component correctly in responsive.

**_items** (array): Each *item* represents one choice for the animation frames and contains values for **_graphic** and **_highlight** if required.

**_hotspots** (array): Each *_hotspots* specifies the position of the hotspot area and border radius if required.

**_feedback** (array): Feedback popup text opens when click on hotspot.

### Limitations

Not identified yet. 

### Browser/platform specification

Intended to develop standard Adapt browser/devices specifications. Development of this component is under progress.

----------------------------
**Version number:**  0.0.1 
**Framework versions:** 2.0.15  
**Accessibility support:** WAI AA    
**Author / maintainer:** Kunj B Sharma <kunjsharma@hotmail.com>    
