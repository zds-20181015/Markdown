class DragDrop {
  muya: any
  constructor(muya: any) {
    this.muya = muya
    this.dragOverBinding()
    this.dropBinding()
    this.dragendBinding()
    this.dragStartBinding()
  }

  dragStartBinding() {
    const { container, eventCenter } = this.muya

    const dragStartHandler = (event: any) => {
      if (event.target.tagName === 'IMG') {
        return event.preventDefault()
      }
    }

    eventCenter.attachDOMEvent(container, 'dragstart', dragStartHandler)
  }

  dragOverBinding() {
    const { container, eventCenter, contentState } = this.muya

    const dragoverHandler = (event: any) => {
      contentState.dragoverHandler(event)
    }

    eventCenter.attachDOMEvent(container, 'dragover', dragoverHandler)
  }

  dropBinding() {
    const { container, eventCenter, contentState } = this.muya

    const dropHandler = (event: any) => {
      contentState.dropHandler(event)
    }

    eventCenter.attachDOMEvent(container, 'drop', dropHandler)
  }

  dragendBinding() {
    const { eventCenter, contentState } = this.muya

    const dragleaveHandler = (event: any) => {
      contentState.dragleaveHandler(event)
    }

    eventCenter.attachDOMEvent(window, 'dragleave', dragleaveHandler)
  }
}

export default DragDrop
