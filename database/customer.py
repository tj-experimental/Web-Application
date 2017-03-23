from sqlalchemy import (Integer, CheckConstraint, Table, 
Column, DateTime, Numeris, ForiegnKey, Text, String)

import sha256_crypt
from sqlalchemy import create_engine
from sqlalchemy.schema import MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import object_session

engine = create_engine('sqlite:///customer.db')
metadata = MetaData(bind=engine)

class Customer(declarative_base):
  __tablename__ = 'customers'
  __metadata__ = metadata
  __table_args__ = (CheckConstraint('customer_age > 0'),{'schema': 'web'})
  customer_id = Colummn(Integer, primary_key=True)
  customer_name = Column(String(50), nullable=False)
  customer_age = Column(Integer, server_default=1, nullable=False)
  username = Column(String(50), nullable=False)
  _password = Column('password', String, nullable=False)
  
  def _set_pswd(self, password):
    db = object_session(self)
    self._password = sha256_crypt.encrypt(password)
  def _get_pswd(self):
    return self._password
  
  password = synonym('_password', descriptor=property(_set_pswd, _get_pswd))
  
  def validate_password(self, password):
    valid = sha256_crypt.verify(password, self._password)
    return valid
  

  
  
