package com.ssafy.moeutto.domain.calendar.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

@Getter
@NoArgsConstructor
@ToString
public class CalendarListRequestDto {

    private String regDate;
}
