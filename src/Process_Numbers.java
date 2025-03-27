import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@SpringBootApplication
public class NumberProcessingController {

    public static void main(String[] args) {
        SpringApplication.run(NumberProcessingController.class, args);
    }

    @PostMapping("/Process_Numbers")
    public Response processNumbers(@RequestBody NumberRequest request) {
        int number1 = request.getNumber1();
        int number2 = request.getNumber2();

        // Выводим числа в терминал
        System.out.println("Received numbers: " + number1 + " and " + number2);

        // Обработка логики, например, сложение чисел
        int sum = number1 + number2;

        return new Response(sum);
    }
}

// Класс для обработки запроса
class NumberRequest {
    private int number1;
    private int number2;

    // Геттеры и сеттеры
    public int getNumber1() {
        return number1;
    }

    public void setNumber1(int number1) {
        this.number1 = number1;
    }

    public int getNumber2() {
        return number2;
    }

    public void setNumber2(int number2) {
        this.number2 = number2;
    }
}

// Класс для структуры ответа
class Response {
    private int sum;

    public Response(int sum) {
        this.sum = sum;
    }

    public int getSum() {
        return sum;
    }
}