package comtrade.basic.rest.service.exception.handler;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import comtrade.basic.rest.service.exception.UserServiceException;


@RestControllerAdvice
public class UserServiceExceptionHandler {

    @ExceptionHandler(UserServiceException.class)
    public ResponseEntity<?> handleControllerException(UserServiceException ex) {
        return new ResponseEntity<>(ex.getMessage(), ex.getHttpStatus());
    }

    @ExceptionHandler({ AccessDeniedException.class })
    public ResponseEntity<?> handleAccessDeniedException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<?> handleControllerException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), INTERNAL_SERVER_ERROR);
    }

}
