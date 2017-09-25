
import visa 
import time


rm = visa.ResourceManager('@ni');
print( rm.list_resources("?*") )
