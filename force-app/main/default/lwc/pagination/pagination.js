import { LightningElement, api } from 'lwc';

export default class Pagination extends LightningElement {
    totalRecord
    visibleRecord
    recordSize=5;
    get columns(){
        return this.visibleRecord;
    }
    @api 
    set columns(data){
        if(data){
        this.totalRecord=data
        this.visibleRecord=data.slice(0, this.recordSize)
        this.totalPage=Math.ceil(data.length/this.recordSize)
        this.updateRecord()
        }

    }
    previousHandler(){

    }

    nextHandler(){

    }
    updateRecord(){
        this.dispatchEvent(new CustomEvent('update', {
        detail:{
            data:this.visibleRecord
        }
        }))
    }



}