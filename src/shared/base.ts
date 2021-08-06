const eventPolyFill = () => {
  if (typeof window.CustomEvent === 'function') return false; // If not IE
  function CustomEvent(event: any, params0: any) {
    const evt = document.createEvent('CustomEvent');
    const params = params0 || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  return false;
};

eventPolyFill();

const readyEvent = new CustomEvent('_COLORPK_SCRIPT_READY');
window.dispatchEvent(readyEvent);
