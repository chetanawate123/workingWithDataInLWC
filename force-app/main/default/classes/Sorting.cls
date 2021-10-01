
public with sharing class Sorting {

 @AuraEnabled(Cacheable = true)
 public static List<contact> sortContactList(){
     return
      [SELECT  Name, Phone, Email FROM Contact  ];
    
 }

}