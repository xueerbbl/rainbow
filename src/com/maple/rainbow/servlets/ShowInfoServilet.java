package com.maple.rainbow.servlets;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.builder.CompareToBuilder;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.util.WebUtils;

import com.maple.rainbow.bean.DayInfo;
import com.maple.rainbow.bean.ImgInfo;
import com.maple.rainbow.dao.BaseInfoDao;

import net.sf.json.JSONArray;

@WebServlet("/ShowInfoServilet")
public class ShowInfoServilet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final int[][] POINTS = { { 45, 195 }, { 95, 250 },
			{ 145, 300 }, { 195, 360 }, { 245, 410 }, { 295, 460 },
			{ 345, 400 }, { 395, 350 }, { 445, 255 }, { 495, 200 },
			{ 545, 165 }, { 595, 195 }, { 645, 260 }, { 700, 220 },{ 745, 180 } };

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		WebApplicationContext cxt = WebApplicationContextUtils.getWebApplicationContext(request.getServletContext());
		BaseInfoDao baseinfoDao = (BaseInfoDao) cxt.getBean("baseinfoDao");
		String date = request.getParameter("startdate");
		List<List<DayInfo>> resultList = new ArrayList<List<DayInfo>>();
		List<DayInfo> dList = null;
		if(null == date){
			dList = baseinfoDao.queryLast15Info();
		} else {
			dList = baseinfoDao.queryLast15Info(date);
		}
		
		//Collections.sort(dList, c);
		int i = 0;
		for (DayInfo dayInfo : dList) {
			if(i>=15){
				break;
			}
			List<DayInfo> tempList = new ArrayList<DayInfo>();
			dayInfo.setIndex(i);
			dayInfo.setX(String.valueOf(POINTS[i][0]));
			dayInfo.setY(String.valueOf(POINTS[i][1]));
			tempList.add(dayInfo);
			resultList.add(tempList);
			i++;
		}
//		for (int j = 0; j < 15 - resultList.size(); j++) {
//			List<DayInfo> tempList = new ArrayList<DayInfo>();
//			resultList.add(0, tempList);
//		}
		
		OutputStream ops = response.getOutputStream();
		JSONArray jsonStr = JSONArray.fromObject(resultList);
		response.setContentType("application/json");
		byte[] bytes = jsonStr.toString().getBytes("UTF-8");
		System.out.println(bytes.length);
		ops.write(bytes);
		ops.flush();
		ops.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		 doGet(request, response);
	}

}
