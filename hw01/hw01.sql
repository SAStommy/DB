/* function of db CRUD*/

/*insert*/
insert school(schoolID,name,content,website) value ("tw01","ntu",null,null);
insert school(schoolID,name,content,website) value ("tw02","ntnu",null,null);
insert school(schoolID,name,content,website) value ("tw03","ntust",null,null);

insert school(name,content,website) value ("ntu",null,null);
insert school(name,content,website) value ("ntnu",null,null);
insert school(name,content,website) value ("ntust",null,null);
/*search*/
select * from school;
select * from school where name = "ntnu";

/*modify*/
update school set name = "onlyu" where schoolID = "tw03";

/*delete*/
delete from school where schoolID = "TW0004";
delete from school where schoolID = "TW0005";