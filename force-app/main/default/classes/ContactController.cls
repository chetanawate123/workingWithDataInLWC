public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
           SELECT Name, Email,Phone,Title,AccountId
             FROM Contact
             
             
            WITH SECURITY_ENFORCED
            ORDER BY Name
            
        ];

    }
}
