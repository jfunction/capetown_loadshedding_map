#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
#  convert_json.py
#  
#  Copyright 2014 Jared <jarednorman@hotmail.com>
#  
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#  
#  

import json
import collections

def main():
	with open('capetown_tables_json_1.json','rb') as f_in:
		d = json.JSONDecoder(object_pairs_hook=collections.OrderedDict).decode(f_in.read())
		stages = sorted(d.keys())
		for stage in stages:
			time_dict = d[stage]
			times = sorted(time_dict.keys())
			for time in times:
				days_dict = time_dict[time]
				start_time = int(time.split(':00 to ')[0])
				#end_time = start_time + 2.5
				days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
				for i, day in enumerate(days):
					shedding_zones = str(days_dict[day])
					if not shedding_zones:
						shedding_zones = []
					else:
						shedding_zones = shedding_zones.split(', ')
					days_dict[day] = shedding_zones
				#time_dict[start_time] = time_dict.pop(time)
	with open('capetown_tables_json_2.json','wb') as f_out:
		f_out.write(json.dumps(d,indent=2))
	return 0

if __name__ == '__main__':
	main()

