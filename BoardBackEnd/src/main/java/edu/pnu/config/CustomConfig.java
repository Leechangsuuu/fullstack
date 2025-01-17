package edu.pnu.config;

import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.micrometer.common.lang.NonNull;

@Configuration
public class CustomConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(@NonNull CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedMethods(CorsConfiguration.ALL)
				.allowedOrigins(CorsConfiguration.ALL);
		
		
//		registry.addMapping("/board/**") // /board 포함 하부 모든 주소에 대해서
//				.allowedMethods(HttpMethod.GET.name(),
//								HttpMethod.POST.name()) // Get & Post Method에 대해서
//				.allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000");
//
//		
//		registry.addMapping("/member/**")
//				.allowedMethods(HttpMethod.GET.name(),
//								HttpMethod.PUT.name())
//				.allowedOrigins("http://localhost:3000");
//		
//		registry.addMapping("/**")
//				.allowCredentials(true) // 클라이언트가 자격증명(쿠키/인증헤더)을 포함하도록 허용
//				.allowedHeaders(HttpHeaders.AUTHORIZATION)// 클라이언트가 요청 시 사용할 수 있는 헤더 지정
//				.exposedHeaders(HttpHeaders.AUTHORIZATION) // 클라이언트가 응답에 접근할 수 있는 헤더 지정
//				.allowedMethods(HttpMethod.GET.name(), // 클라이언트가 요청 시 사용할 수 있는 Method 지정
//								HttpMethod.POST.name(),
//								HttpMethod.PUT.name(),
//								HttpMethod.DELETE.name())
//				.allowedOrigins("http://localhost:3000",
//								"http://127.0.0.1:3000"); 
	}
}
