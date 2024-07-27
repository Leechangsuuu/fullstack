package edu.pnu;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import edu.pnu.domain.Board;
import edu.pnu.persistence.BoardRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSetup implements ApplicationRunner{
	private final BoardRepository boardRepo;
	
	public void run(ApplicationArguments args) throws Exception{
		String s[]= {"이창수", "이창수수"};
		for(int i=1; i<=10;i++) {
			boardRepo.save(Board.builder().title("title"+i).content("content"+i).writer(s[(i%2)]).build());
			
			
		}
	}
}
