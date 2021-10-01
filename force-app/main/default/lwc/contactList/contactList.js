import { LightningElement, wire ,track} from 'lwc';
//import { reduceErrors } from 'c/ldsUtils';
//import NAME_FIELD from '@salesforce/schema/Contact.Name';
//import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
//import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
//import TITLE_FIELD from '@salesforce/schema/Contact.Title';
//import AccountId_FIELD from '@salesforce/schema/Contact.AccountId';







import getContacts from '@salesforce/apex/ContactController.getContacts';
import Title from '@salesforce/schema/Contact.Title';
const COLUMNS = [
    { label: ' Name', fieldName: 'Name', type: 'text',sortable:"true" },
    
    { label: 'Email', fieldName: 'Email', type: 'email',sortable:"true" },
    { label: 'Phone', fieldName: 'Phone', type: 'phone',editable: 'true',sortable:"true" },
    { label: 'Title', fieldName: 'Title', type: 'text',sortable:"true" },
    { label: 'Account Name', fieldName: 'Account Name', type: 'Lookup(Account)',sortable:"true"}
    
    

    
    
    

    

];

export default class ContactList extends LightningElement {
    @track data;
    @track columns = COLUMNS;
    @track sortBy;
    @track sortDirection;
    @wire(getContacts)
    contacts;
    
    handleSortContactData(event) {       
        this.sortBy = event.detail.fieldName;       
        this.sortDirection = event.detail.sortDirection;       
        this.sortContactData(event.detail.fieldName, event.detail.sortDirection);
    }

    sortContactData(fieldname, direction) {
        
        let parseData = JSON.parse(JSON.stringify(this.data));
       
        let keyValue = (a) => {
            return a[fieldname];
        };

       let isReverse = direction === 'asc' ? 1: -1;

           parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
           
            return isReverse * ((x > y) - (y > x));
        });
        
        this.data = parseData;

    }

}
  
   
