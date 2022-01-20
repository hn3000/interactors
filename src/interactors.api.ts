export enum HierarchyChangeKind {
    ATTACH, DETACH
}

export class InteractorHierarchyChange<
    II extends InteractorBasic
> {
    
    constructor(
        i:II, 
        attachment:IInteractorHost<II>, 
        change:HierarchyChangeKind, 
        rebindHandlers:string[]
    ) {
        this._interactor = i;
        this._attachment = attachment;
        this._change = change;
        this._rebindHandlers = rebindHandlers;
    }
    
    private _interactor:II;
    private _attachment:IInteractorHost<II>;
    private _change:HierarchyChangeKind;
    private _rebindHandlers:string[];
}
/**
 * Host for interactors, emits events into the interactor
 */
export interface IInteractorHost<IInteractor extends InteractorBasic> {
    attach(i:IInteractor):void;
    detach(i:IInteractor):void;
    isAttached(i:IInteractor):boolean;
    
    interactionStart(i:IInteractor):boolean;
    interactionEnd(i:IInteractor):void;
    interactionIsActive(i:IInteractor):boolean;
    
    
}


/**
 * interface for event handler bundles
 */
export interface Interactor<
        EMouseEvent extends MouseEvent,
        EPointerEvent extends PointerEvent,
        EWheelEvent extends WheelEvent,
        ETouchEvent extends TouchEvent
    >
    extends InteractorMouseEvents<EMouseEvent>, 
            InteractorPointerEvents<EPointerEvent>, 
            InteractorWheelEvents<EWheelEvent>,
            InteractorTouchEvents<ETouchEvent>,
            InteractorCustomEvents<IEvent>,
            InteractorLifeCycleEvents<
              Interactor<
                EMouseEvent, EPointerEvent,
                EWheelEvent, ETouchEvent
              >
            >
{
}

export type InteractorBasic = Interactor<MouseEvent, PointerEvent, WheelEvent, TouchEvent>;

export interface IEvent {
    
}

export interface EventHandler<IEvent> {
    (x:IEvent): void;
}

export interface IInteractorAttachment<
    IInteractor extends InteractorBasic
> {
    host:IInteractorHost<IInteractor>;
}

export interface InteractorLifeCycleEvents<
    IInteractor extends InteractorBasic
> {
    onattached?(ev:IInteractorAttachment<IInteractor>):void;
    ondetached?(ev:IInteractorAttachment<IInteractor>):void;
}

export interface InteractorMouseEvents<
  EMouseEvent extends MouseEvent
> {
    onclick?(ev:EMouseEvent):void;
    ondblclick?(ev:EMouseEvent):void;
    oncontextmenu?(ev:EMouseEvent):void;
    onmousedown?(ev:EMouseEvent):void;
    onmouseenter?(ev:EMouseEvent):void;
    onmouseleave?(ev:EMouseEvent):void;
    onmousemove?(ev:EMouseEvent):void;
    onmouseout?(ev:EMouseEvent):void;
    onmouseover?(ev:EMouseEvent):void;
    onmouseup?(ev:EMouseEvent):void;
}

export interface InteractorPointerEvents<
  EPointerEvent extends PointerEvent
> {
    onpointercancel?(ev:EPointerEvent):void;
    onpointerdown?(ev:EPointerEvent):void;
    onpointerenter?(ev:EPointerEvent):void;
    onpointerleave?(ev:EPointerEvent):void;
    onpointerlockerror?(ev:EPointerEvent):void;
    onpointerlockchange?(ev:EPointerEvent):void;
    onpointermove?(ev:EPointerEvent):void;
    onpointerout?(ev:EPointerEvent):void;
    onpointerover?(ev:EPointerEvent):void;
    onpointerup?(ev:EPointerEvent):void;
}
    
export interface InteractorWheelEvents<
  EWheelEvent extends WheelEvent
> {
    onwheel?(ev:EWheelEvent):void;
}


export interface InteractorTouchEvents<
    ETouchEvent extends TouchEvent
> {
    ontouchcancel?(ev:ETouchEvent):void;
    ontouchend?(ev:ETouchEvent):void;
    ontouchenter?(ev:ETouchEvent):void;
    ontouchleave?(ev:ETouchEvent):void;
    ontouchmove?(ev:ETouchEvent):void;
    ontouchstart?(ev:ETouchEvent):void;
}

export interface InteractorCustomEvents<EEvent extends IEvent> {
    [key:string]:EventHandler<EEvent>;
}


