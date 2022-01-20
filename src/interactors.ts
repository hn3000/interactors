import {
    Interactor,
    IInteractorHost,
    IInteractorAttachment,
    InteractorBasic,
    EventHandler,
    IEvent
} from "./interactors.api";

function createBoundHandler() {
    
}

function _listHandlers<II extends InteractorBasic>(i:II):string[] {
    return [];
}

export class InteractorComposite<
        ME extends MouseEvent,
        PE extends PointerEvent,
        WE extends WheelEvent,
        TE extends TouchEvent
    >
    implements Interactor<ME,PE,WE,TE>,
    IInteractorHost<Interactor<ME,PE,WE,TE>>
{
    attach(i: Interactor<ME,PE,WE,TE>) {
        if (-1 === this._interactors.indexOf(i)) {
            this._interactors.push(i);
            
            let host = this as IInteractorHost<Interactor<ME,PE,WE,TE>>;
            
            i.onattached({host:host});

            this._rebind();
        }
    }
    
    detach(i: Interactor<ME,PE,WE,TE>) {
        let index = this._interactors.indexOf(i);
        if (-1 !== index) {
            this._interactors.splice(index, 1);
            
            let host = this as IInteractorHost<Interactor<ME,PE,WE,TE>>;
            
            i.ondetached({host:host});
            
            this._rebind();
        }
    }
    
    isAttached(i: Interactor<ME,PE,WE,TE>) {
        return -1 != this._interactors.indexOf(i);
    }
    
    interactionStart(i: Interactor<ME,PE,WE,TE>):boolean {
        if (null != this._interaction) {
            if (this._host.interactionStart(this)) {
                this._interaction = i;
                return true;
            }
        }
        return false;
    }
    interactionEnd(i: Interactor<ME,PE,WE,TE>) {
        if (this._interaction === i) {
            this._host.interactionEnd(this);
            this._interaction = null;
        }
    }
    interactionIsActive(i:Interactor<ME,PE,WE,TE>):boolean {
        if (this._interaction === i) {
            return true;
        } else if (null != this._interaction && this._interaction['interactionIsActive']) {
            let ii = this._interaction as InteractorComposite<ME,PE,WE,TE>;
            return ii.interactionIsActive(i);
        } 
    }

    onattached(ev: IInteractorAttachment<Interactor<ME,PE,WE,TE>>) {
        if (null == this._host) {
            this._host = ev.host;
        }
    }
    ondetached(ev: IInteractorAttachment<Interactor<ME,PE,WE,TE>>) {
        if (this._host === ev.host) {
            this._host = null;
        }
    }
    
    _rebind(interactor?:Interactor<ME,PE,WE,TE>) {
        var rebindList:string[];
        if (null !== interactor) {
            rebindList = _listHandlers(interactor); 
        } else {
            rebindList = _listHandlers(this);
        }
        
        for (let i = 0, n = rebindList.length; i < n; ++i) {
            this[rebindList[i]] = null;
            
        }
        
    }

    [x:string]:EventHandler<IEvent>|any;
    
    private _host: IInteractorHost<Interactor<ME,PE,WE,TE>>;
    private _interactors: Interactor<ME,PE,WE,TE>[];
    private _interaction: Interactor<ME,PE,WE,TE> | InteractorComposite<ME,PE,WE,TE>;
}

/*
export class InteractorAttachmentPoint<IInteractor extends InteractorBasic>
    implements IInteractorHost<IInteractor>
{
    constructor
    
    attach(i:IInteractor) {
        
    }
}
*/