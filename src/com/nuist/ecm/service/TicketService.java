package com.nuist.ecm.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nuist.ecm.dao.TicketDao;

@Service
public class TicketService {

	@Autowired
	private TicketDao ticketDao;
	
	public List<Map<String, Object>> queryHotStations() throws Exception {
		return ticketDao.queryHotStations();
	}
}
