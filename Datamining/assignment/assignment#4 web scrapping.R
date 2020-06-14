library(dplyr)
library(stringr)
library(httr)
library(rvest)
library(XML)
library(RSelenium)
library(seleniumPipes)
library(htmltools)

hompage <- 'https://stackoverflow.com/search?page=1&tab=Relevance&q=matrix'
#matrix 라고 검색을 하였을 때 나오는 결과물을 다뤘습니다. 

#RSelenium 가동 

remDr = remoteDriver(
  remoteServerAddr="localhost",
  port=4445L,
  browserName="chrome")

remDr$open()
Sys.sleep(1)
remDr$navigate(hompage)


#최종적으로 만들 data에 대한 준비 
df_rmaster <- data.frame() 
Title = NULL
Date = NULL
Views = NULL
Question = NULL
Tags = NULL
Q_comments = NULL
Answer = NULL
A_comments = NULL


parse_url(hompage)
#url을 분석하였을 때 현재 페이지가 바뀔때마다 바뀌는것은 query$page의 숫자가 하나씩 바뀐다.

page <- seq(1:10)

#out loop는 페이지를 방문 , inner loop 는 질문 하나씩을 들어간다.

start <- proc.time()


#out loop 
for( i in page){
  
  work_url <- modify_url(hompage, query = list(page = i) )
  work_quest <- read_html(work_url) %>% html_nodes('div.result-link') %>%
    html_nodes('a[href^="/questions/"]') %>% html_attr('href')
  work_quest <- paste("https://stackoverflow.com", work_quest, sep = "")
  #page마다의 question들의 url를 저장하였다. 
  #이제 그 url을 들어가서 필요한 title, date, views, question, tags, Q_comments, Answer, A_comments 등의 정보를 가져오자 
  cat((i),'/10 page------------\n', sep = "")
  
  
  #inner loop 
  for( j in 1:length(work_quest)) {
    
    tryCatch({
      #Q_comments 와 A_comments 가 5개가 넘어갔을때 show (numeber) more comments 를 클릭하여 관련 정보를 가져오기 
      #위하여 Selenium package 를 사용하였습니다.
      cat((j),'/15 question\n', sep = "") # 1페이지에 있는 15개의 질문중 현재 몇번째를 해결하는지 명시한다. 
      
      
      remDr$navigate(work_quest[j]) #각각의 질문 화면을 방문합니다. 
      Sys.sleep(1.5) #방문 로딩시간을 기다려줍니다. 
      
       
      expandcomment <- remDr$findElements(using = 'css',value = "a[title^='expand']")
      #expand Url 을 모두 클릭하도록 합니다. 
      for( k in 1:length(expandcomment)){
        expandcomment[[k]]$sendKeysToElement(list("laptops",key="enter")) 
      } 
      #처음에는 clickElement를 사용하였으나 실행이 안되는 경우도 있어서 enter 키를 이용하여
      #클릭하는 효과와 동일한 효과를 가져왔다. 
      
      
      Sys.sleep(1.5) #페이지 로딩 
      
      
      #unfold 된 화면의 html 을 가져와서 work_paragraph 에 저장
      work_paragraph <- remDr$getPageSource()[[1]] %>% read_html
    
    
    #title
    work_title <- work_paragraph %>% 
      html_nodes('h1.grid--cell.fs-headline1.fl1.ow-break-word.mb8')%>%
      html_nodes('a.question-hyperlink') %>% html_text() %>% gsub("\\s+", " ", .) %>% str_trim
    
    #date
    work_date <- work_paragraph %>% html_nodes('div.grid--cell.ws-nowrap.mr16.mb8') %>% 
      html_node('time') 
    work_date <- work_date[1] %>% html_attr("datetime")
    
    
    #views
    work_view <- work_paragraph %>% html_nodes('div.grid.fw-wrap.pb8.mb16.bb.bc-black-2') %>%
      html_nodes('div.grid--cell.ws-nowrap.mb8')
    
    work_view <- as.numeric(
      gsub(",", "", 
           gsub(" times", "", 
                gsub("Viewed ", "", work_view[length(work_view)] %>%  html_attr("title") ) )) )
     #view 의 숫자가 많으면 , 가 들어가므로 이를 제거하고 numeric으로 바꾸어 저장합니다. 
    
    
    # 위의 코드에서 html_attr함수로 추출한 title은 3개 존재 합니다. class들의 이름이 비슷하여 하나의 class로 
    # 확정되지 않으므로 3개의 title 에서 마지막 순서인 view를 뽑기위해서 work_view [3] 이라 기록하였으나 
    # 오래된 게시물 같은경우에는 Active class 자체가 존재하지 않아 추출되는 title이 2개여서 오류가 발생합니다.
    # 따라서 이를 [3]을 [length(work_view)] 로 변경하여 Active class가 존재하지 않는 경우에도 데이터를 수집할 수 있게 하였습니다. 
    
    
    #question
    work_question <- work_paragraph %>% html_nodes('div.postcell.post-layout--right') %>%
      html_nodes('div.post-text') %>% html_text() %>% gsub("\\s+", " ", .) %>% str_trim
    
    
    #tags
    work_tags <- work_paragraph %>% html_nodes('div.grid.ps-relative.d-block') %>%
      html_text() %>% gsub("\\s+", " ", .) %>% str_trim
    
    
    #Q_comments 
    work_qcomments <- work_paragraph %>% html_nodes('div#question') %>% 
      html_nodes('span.comment-copy') %>% html_text() %>% gsub("\\s+", " ", .) %>% str_trim
    work_qcomments <- paste(work_qcomments, collapse = " OOO ")
    
    
    
    #Answer ##한 문제에 대한 Answer 가 여러개만 row를 분리해서 하라 수정 
    #ANSWER 갯수
    answer_node <- work_paragraph %>% html_nodes('div#answers') %>%
      html_nodes('div.answer')
    length(answer_node) #Answer 의 갯수 
    
    for(x in 1:length(answer_node)){
      
      #Answer body 
      work_answer <- answer_node[x] %>% html_nodes('div.post-text') %>% 
        html_text() %>% gsub('\\s+', ' ', .) %>% str_trim
      
      #A_comments  
      work_acomments <- answer_node[x] %>% html_nodes('span.comment-copy') %>% 
        html_text() %>% gsub("\\s+", " ", .)
      work_acomments <- paste(work_acomments, collapse = " OOO ")
      
      
      #정보의 저장 answer 개수만큼 정보를 저장 
      
      Title <- c(Title,work_title)
      Date <- c(Date, work_date)
      Views <- c(Views, work_view)
      Question <- c(Question, work_question)
      Tags <- c(Tags, work_tags)
      Q_comments <- c(Q_comments, work_qcomments)
      Answer <- c(Answer, work_answer)
      A_comments <- c(A_comments, work_acomments)
      
      if (length(answer_node) == 0){
        Answer <- c(Answer, NA)
        break 
        }  
      
    }
    
    
    
    
    }, error = function(e){print("An error occurs, skip the question")})

  }
  
  
  Sys.sleep(1) 
  
}


remDr$close
end <- proc.time()
end - start

#write csv file 

df_rmaster <- data.frame(Title , Date, Views, Question, Tags,Q_comments, Answer, A_comments)
write.csv(df_rmaster, file= "Stackoverflow_QA.csv")


###########################ggplot 5개 
library(ggplot2)
library(treemap)
library(plyr)
library(textstem)
library(tm)

df_rmaster <- read.csv("Stackoverflow_QA.csv")

#ggplot 1 연도별 question 개수 

uploadyear <- as.numeric( df_rmaster$Date %>% substr(.,1,4) )
df_year <- cbind(df_rmaster, uploadyear ) %>% select(Title, uploadyear) %>% unique()
num_year <- table(df_year$uploadyear)
barplot(num_year, main = "The number of Questions in each Year ")



#ggplot 2 view 랑 answer에 달린 comments 개수의 관계 

comandview <- df_rmaster %>% select(Title, Views, Q_comments) %>% unique()
numcom_q <- NULL
for(t in 1:nrow(comandview)){
  if(str_count(comandview$Q_comments[t])==0){
    numcom_q <- c(numcom_q, 0 )
  } else {
    numcom_q <- c(numcom_q, str_count(comandview$Q_comments[t], "OOO" ) + 1 ) 
    #OOO 를 이용하여 comment 를 구별하였으므로, OOO으로 comment 의 개수를 센다. 
  }

}
comandview <- cbind(comandview, numcom_q)
ggplot(comandview, aes(x=log(Views), y=numcom_q)) +
  geom_point(alpha=0.8) +
  geom_smooth() +
  labs(title = "Correlation of views and the number of comments at question")
#그렸을 때 geom_smooth()` using method = 'loess' and formula 'y ~ x'

#ggplot 3 comments 개수에 대한 pie plot 

ggplot(comandview, aes(x = "", fill = factor(comandview[,4]))) + 
  geom_bar(width = 1) +
  theme(axis.line = element_blank(), 
        plot.title = element_text(hjust=0.5)) + 
  labs(fill="Q_comments", 
       x=NULL, 
       y=NULL,
       caption = "pie chart")+
  coord_polar(theta = "y", start=0)+
  labs(title = "Q_comment")



##ggplot 4 tag의 개수가 view에 미치는 영향 
tagandview <- df_rmaster %>% select(Tags, Views) %>% unique()
numtag <- tagandview$Tags %>% str_count(., " ") +1 # space 를 이용하여 tag의 개수를 센다. 
tagandview <- cbind(tagandview, numtag) ## 태그의 개수를 저장 

tagandview %>%
ggplot(aes(x=numtag , y=log(Views), group=numtag , fill= numtag)) +
  geom_boxplot() +
  geom_point( color = "black") +  
  labs(title = "Correlation of the number of tags and Views")


# numtag 가 많을 수록 view 의 log 값이 증가하는 것을 볼 수 있다. 
                



##ggplot 5 질문의 길이(nchar)가 답변의 평균 길이에 미치는 영향 

library(plyr)
nnquest <- df_rmaster %>% select(Question)
nnquest2 <- ddply(nnquest, .(Question), nrow)


n_answer <-nnquest2$V1  ### answer 의 개수 벡터이다. 

questbody <- as.character(df_rmaster$Question) %>% unique()
len_quest <- nchar(questbody)

answbody <- as.character(df_rmaster$Question)

len_answ = 0 ##그 답변의 char 갯수를 저장 
len_mean_answ = as.numeric()
#answer 의 평균 답변 길이를 구하자 


#Question 에 answer 개수 만큼 더해서 mean 값을 구한다. 
for(v in 1:length(questbody)){
  
  for( u in 1:n_answer[v]) {
  len_answ <- len_answ + nchar(answbody[u])
    
  }
  len_mean_answ <- c(len_mean_answ , len_answ/n_answer[v] ) 
}


relatelength <- data.frame(len_quest, len_mean_answ)

relatelength %>%
  ggplot(aes(x=len_quest, y=len_mean_answ)) +
  geom_point() +
  geom_smooth(method = "gam") +
  labs(title = "Correlation of the length of Question and length of Answer" ,
      x= "Length of question",
      y= "Mean length of answer" )

## 초반에는 증가하는 추세를 보이다가 어느정도 이상의 긴 질문에서는 답변의 길이가 질문의 길이와 상관 없음 이 보여졌습니다.
#(question 길이가 커질때 분산이 커지는 것을 볼 수 있다. )



