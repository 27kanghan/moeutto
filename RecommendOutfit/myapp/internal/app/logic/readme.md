## 같은 옷이 추천되는 문제
- 옷을 등록하면 reg_date가 당일이 되고
- 2일 전까지의 기록으로 점수식으로 산정하기 떄문에 해당 문제가 발생 하는 것으로 추정합니다
- 가입일 옷들을 등록한 사용자는 앞으로 3일의 옷이 같은 옷으로 되어있어 당황할 것입니다

## 해결방법 
- 오늘, 어제 , 2일전 점수 산정을 각기 다르게 적용하고 랜덤성을 높이겠습니다