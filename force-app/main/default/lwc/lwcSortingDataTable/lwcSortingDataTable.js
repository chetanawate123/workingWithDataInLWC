import { LightningElement , wire, track} from 'lwc';
import sortContactList from '@salesforce/apex/lwcSortingDataTableCtrl.sortContactList';
const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        sortable: "true"
    }, {
        label: 'Email',
        fieldName: 'Email',
        type: 'email',
        sortable: "true"
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: "true"
    }, {
        label: 'Title',
        fieldName: 'Title',
        type: 'Picklist',
        sortable: "true"
    }, 
    {
        label: 'Account Name',
        fieldName: 'AccountName',
        type: 'Lookup(Account)',
        sortable: "true"
    }
];
export default class lwcSortingDataTable extends LightningElement {
    @track data;
    @track columns = columns;
    @track sortBy;
    @track sortDirection;
    @wire(sortContactList)
    contacts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;
 
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }
 
 
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