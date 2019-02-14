package comtrade.basic.rest.service.exception;

import org.springframework.http.HttpStatus;

@SuppressWarnings("serial")
public class UserServiceException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String message;

    public UserServiceException(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
    
    public String getMessage() {
        return message;
    }
}
