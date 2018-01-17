import React, { Component } from 'react';
import Note from './Note';
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        // {
        //   id: 0,
        //   note: "Oh, hello there!"
        // },
        // {
        //   id: 1,
        //   note: "Thanks for visiting :)"
        // },
        // {
        //   id: 2,
        //   note: "Please, play around!"
        // }
      ]
    }
    this.add = this.add.bind(this)
    this.nextId = this.nextId.bind(this)
    this.eachNote = this.eachNote.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentWillMount() {
    var self = this
    if (this.props.count) {
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
      .then(response => response.json())
      .then(json => json[0]
        .split('. ')
        .forEach(sentence => self.add(sentence.substring(0, 25))))
    }
  }

  add(text) {
    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          id: this.nextId(),
          note: text
        }
      ]
    }))
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  update(newText, i) {
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : {...note, note: newText}
      )
    }))
  }

  remove(id) {
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id)
    }))
  }

  eachNote(note, i) {
    return (
      <Note key={note.id}
            index={note.id}
            onChange={this.update}
            onRemove={this.remove}>
            {note.note}
            </Note>
    )
  }

  render () {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.add.bind(null, "New Note")}
                id="add">
            <FaPlus />
        </button>
      </div>
    )
  }
}

export default Board;
