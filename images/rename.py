# -*- coding: utf-8 -*-
"""
Created on Wed May 11 09:47:52 2022

@author: iilun
"""

import os 


values = os.listdir(os.getcwd())
i=0

for value in values :
    if ((".png" or ".PNG") not in value) or ("1an.png" in value) :
        pass
    name = str(i) + ".png"
    old_file = os.path.join(os.getcwd(), value)
    new_file = os.path.join(os.getcwd(), name)
    os.rename(old_file, new_file)
    i+=1