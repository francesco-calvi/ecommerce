import Vue from 'vue';

Vue.directive('click-outside', {
  bind: function(el, binding) {
    const clickEventHandler = event => {
      if (!el.contains(event.target) && el !== event.target) {
        // as we are attaching a click event listern to the document (below)
        // ensure the events target is outside the element or a child of it
        binding.value(event); // before binding it
      }
    };
    // attached the handler to the element so we can remove it later easily
    el.__vueClickEventHandler__ = clickEventHandler;

    // attaching ourClickEventHandler to a listener on the document here
    document.addEventListener("click", clickEventHandler);
  },
  unbind: function(el) {
    // Remove Event Listener
    document.removeEventListener("click", el.__vueClickEventHandler__);
  }
});
