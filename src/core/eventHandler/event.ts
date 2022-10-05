import { getUniqueId } from '../utils'

class EventCenter {
  events: any[]
  listeners: any
  constructor() {
    this.events = []
    this.listeners = {}
  }

  /**
   * [attachDOMEvent] bind event listener to target, and return a unique ID,
   * this ID
   */
  attachDOMEvent(target: any, event: any, listener: any, capture: any) {
    if (this.checkHasBind(target, event, listener, capture)) return false
    const eventId = getUniqueId()
    target.addEventListener(event, listener, capture)
    this.events.push({
      eventId,
      target,
      event,
      listener,
      capture
    })
    return eventId
  }

  /**
   * [detachDOMEvent removeEventListener]
   * @param  {[type]} eventId [unique eventId]
   */
  detachDOMEvent(eventId: any) {
    if (!eventId) return false
    const index = this.events.findIndex((e) => e.eventId === eventId)
    if (index > -1) {
      const { target, event, listener, capture } = this.events[index]
      target.removeEventListener(event, listener, capture)
      this.events.splice(index, 1)
    }
  }

  /**
   * [detachAllDomEvents remove all the DOM events handler]
   */
  detachAllDomEvents() {
    this.events.forEach((event) => this.detachDOMEvent(event.eventId))
  }

  /**
   * inner method for subscribe and subscribeOnce
   */
  _subscribe(event: any, listener: any, once = false) {
    const listeners = this.listeners[event]
    const handler = { listener, once }
    if (listeners && Array.isArray(listeners)) {
      listeners.push(handler)
    } else {
      this.listeners[event] = [handler]
    }
  }

  /**
   * [subscribe] subscribe custom event
   */
  subscribe(event: any, listener: any) {
    this._subscribe(event, listener)
  }

  /**
   * [unsubscribe] unsubscribe custom event
   */
  unsubscribe(event: any, listener: any) {
    const listeners = this.listeners[event]
    if (
      Array.isArray(listeners) &&
      listeners.find((l) => l.listener === listener)
    ) {
      const index = listeners.findIndex((l) => l.listener === listener)
      listeners.splice(index, 1)
    }
  }

  /**
   * [subscribeOnce] usbscribe event and listen once
   */
  subscribeOnce(event: any, listener: any) {
    this._subscribe(event, listener, true)
  }

  /**
   * dispatch custom event
   */
  dispatch(event: any, ...data: any) {
    const eventListener = this.listeners[event]
    if (eventListener && Array.isArray(eventListener)) {
      eventListener.forEach(({ listener, once }) => {
        listener(...data)
        if (once) {
          this.unsubscribe(event, listener)
        }
      })
    }
  }

  // Determine whether the event has been bind
  checkHasBind(cTarget: any, cEvent: any, cListener: any, cCapture: any) {
    for (const { target, event, listener, capture } of this.events) {
      if (
        target === cTarget &&
        event === cEvent &&
        listener === cListener &&
        capture === cCapture
      ) {
        return true
      }
    }
    return false
  }
}

export default EventCenter
