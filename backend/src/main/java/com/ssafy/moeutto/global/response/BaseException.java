package com.ssafy.moeutto.global.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseException extends Exception {
    public BaseResponseStatus status;
}
