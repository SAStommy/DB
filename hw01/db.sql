create database FYP;
use FYP;

create table feature(
  featureID varchar(20),
  item varchar(20),
  name varchar(20),
  itemname varchar(20),
  itemtype varchar(20),
  primary key(featureID),
  unique(item)
);

create table school(
  schoolID varchar(20),
  name varchar(20),
  content varchar(20),
  website varchar(20),
  primary key(schoolID)
);

create table question(
  questionID varchar(20),
  name varchar(20),
  type varchar(20),
  content varchar(20),
  primary key(questionID)
);

create table department(
  departmentID varchar(20),
  name varchar(20),
  type varchar(20),
  content varchar(20),
  primary key(departmentID)
);

/* relation table*/

create table qfmatch(
  questionID varchar(20),
  featureID varchar(20),
  foreign key (questionID) references question(questionID) on delete cascade,
  foreign key (featureID) references feature(featureID) on delete cascade
);

create table schoolans(
  schoolID varchar(20),
  featureID varchar(20),
  foreign key (schoolID) references school(schoolID) on delete cascade,
  foreign key (featureID) references feature(featureID) on delete cascade
);

create table deptans(
  departmentID varchar(20),
  featureID varchar(20),
  foreign key (departmentID) references department(departmentID) on delete cascade,
  foreign key (featureID) references feature(featureID) on delete cascade
);

create table pointans(
  schoolID varchar(20),
  departmentID varchar(20),
  score int(20),
  ioh varchar(20),
  foreign key (schoolID) references school(schoolID) on delete cascade,
  foreign key (departmentID) references department(departmentID) on delete cascade
);



