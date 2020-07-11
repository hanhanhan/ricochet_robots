<!-- https://github.com/react-dnd/react-dnd/issues/2253 -->

drop not being called issue

# DND-Core

No backend
No DOM

actions + reducers

## Manager

initializes new store,
initializes new monitor,
backend gets configured in factory

store - redux store (initialized w/o devtools by default)
monitor = store + registry

backend only gets set up for manager if there's a ref count in state

## Monitor

has store, registry

has a bunch of drag/drop ok methods
looks in registry for ids
subscribing to changes

## Registry (Handler)

has store
sources, targets, types

dispatches adding + removing targets, sources from / to store

## Entrypoint:

createDragDropManager in factories

# React DnD HTML5 Backend

---

## REDUX DEVTOOLS

- HOVER
  REMOVE_TARGET
  REMOVE_TARGET
  REMOVE_SOURCE
  ADD_SOURCE
  ADD_TARGET
  ADD_TARGET
  DROP
  END_DRAG

### GUI Event Dispatch

no BEGIN_DRAG action shown

### Programmatic Event Dispatch

dnd-core/BEGIN_DRAG
itemType(pin):null => 'robot'
item(pin):null => {id:'1',type:'robot'}
sourceId(pin):null => 'S1'
isSourcePublic(pin):null => false
stateId(pin):263 => 264

dnd-core/BEGIN_DRAG again
dragOperation
itemType(pin):null => 'robot'
item(pin):null => {id:'1',type:'robot'}
sourceId(pin):null => 'S1'
isSourcePublic(pin):null => false
stateId(pin):489 => 490
hover
dnd-core/PUBLISH_DRAG_SOURCE
isSourcePublic(pin):false => true
stateId(pin):492 => 493

dirtyHandlerIds
0(pin):'T2'
1(pin):'T0'
2(pin):'T0'
3(pin):'T2'
stateId(pin):493 => 494

PUBLISH_DRAG_SOURCE being triggered

INIT_COORDS
BEGIN_DRAG
PUBLISH_DRAG_SOURCE

## Event Listening Order of Operations

Events in the target phase will trigger all listeners on an element in the order they were registered, regardless of the useCapture parameter.

event listeners by backend connect functions

## hooks

### useDragHandler

- creates a handler object of functions on initialization - beginDrag, canDrag, isDragging (runs once - useMemo no dependences) - doesn't return anything????

### useDragSourceMonitor

- initializes a monitor
- uses manager through useDragDropManager
- has a connector based on manager

### useDrag

https://github.com/react-dnd/react-dnd/blob/main/packages/core/react-dnd/src/hooks/useDrag.ts

- uses useDragSourceMonitor to get monitor, connector
- passes to useDragHandler(specRef, monitor, connector)
- useMonitorOutput to get current props
- returns [result, connectDragSource, connectDragPreview]
- connectdragsource is connector.hooks.dragSource()

DragDropManagerImpl
getActions function returns menu of redux actions

## Event Handlers from HTML5 Backend

dragstart handleTopDragStart
dragstart handleTopDragStartCapture
dragover handleTopDragOver
dragover handleTopDragOverCapture
dragend handleTopDragEndCapture
drop handleTopDrop
drop handleTopDropCapture
