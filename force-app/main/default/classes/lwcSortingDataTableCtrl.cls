public with sharing class lwcSortingDataTableCtrl {
 
    @AuraEnabled(Cacheable = true)
    public static List<Contact> sortContactList(){
        return [
            SELECT Name, Email, Phone, Title,Account.Name
            FROM Contact
        ];
    }
 
}