const CompletionInfo = props => {
  const { className, tasks: tasksObj } = this.props
  const tasks = Object.values(tasksObj)
  const uncompleted = tasks.filter(task => task.value === undefined)
  const areUnsaved = tasks
    .filter(task => !task.saved && task.value !== undefined)
    .includes(true)
  const completedCount = tasks.length - uncompleted.length

  if (completedCount > 0) {
    return (
      <ComplInfoStyle
        pill
        variant="primary"
        className={className}
        style={{ background: 'red', paddingLeft: '1em' }}
      >
        {/* {' put paddingLeft instead of space? '} */}
        {completedCount} <MdClose />
      </ComplInfoStyle>
    )
  }
  return null
}

class ComplInfo extends Component {
  render() {
    const { className, tasks } = this.props
    let background_color = 'red'
    let icon = <MdClose />
    const unCompleted = Object.values(tasks).filter(i => i.value === undefined)
    const unSaved = Object.values(tasks)
      .map(i => !i.saved && i.value !== undefined)
      .includes(true)
    const length = Object.values(tasks).length - unCompleted.length
    if (!unSaved) {
      background_color = 'blue'
      icon = <MdDone />
    }
    if (length) {
      return (
        <ComplInfoStyle
          pill
          variant="primary"
          className={className}
          style={{ background: background_color }}
        >
          {' '}
          {length} {icon}
        </ComplInfoStyle>
      )
    }
    return null
  }
}
