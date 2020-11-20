library(readr)
library(dplyr)
library(ggplot2)
library(purrr)
library(devtools)
library(ggbiplot)
library(corrplot)
library(caret)
library(FSelector)
setwd("C:/Users/Park/namda_git/Datamining/term-project")
firedata <- read.csv(file = 'forestfires.csv', header = T, stringsAsFactors = F )

#1) 데이터 전처리 + 시각화 해석 

  #Na 값 확인 
sum(is.na(firedata))
str(firedata)

  #중복 제거  
sum(duplicated(firedata)) #4개의 data가 중복이 된다. 
firedata <- unique(firedata)

  #Monthly frequency 
firedata <- firedata %>% mutate(month = factor(month, 
  levels = c("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec")))

fire_month <- firedata %>% group_by(month) %>% 
  summarize(total_fires = n())


ggplot(data = fire_month) +
  aes(x = month, y = total_fires) +
  geom_bar(stat = "identity")  +
  theme(panel.background = element_rect(fill = "white"), 
        axis.line = element_line(size = 0.25, colour = "black"))

  #Monthly attribute - using boxplot
create_boxplots <- function(x, y) {
  ggplot(data = firedata) + 
    aes_string(x = x, y = y) +
    geom_boxplot() +
    theme(panel.background = element_rect(fill = "white"))
}

x_month <- names(firedata)[3] 
y_box_attr <- names(firedata)[5:12]

box_month <- map2(x_month,y_box_attr, create_boxplots)


  #fire area - using scatterplots 

create_scatterplots = function(x, y) {
  ggplot(data = firedata) + 
    aes_string(x = x, y = y) +
    geom_point() +
    geom_smooth() +
    theme(panel.background = element_rect(fill = "white"))
}

x_scatter <- names(firedata)[5:12]
y_area <- names(firedata)[13]

scatters <- map2(x_scatter, y_area, create_scatterplots)
scatters[1]






#PCA
dt <- firedata[, c(-1,-2, -3,-4)]
dt_group <- firedata[, c(3,4)]
str(dt)
pca_dt <- prcomp(dt, center = T, scale. = T)
pca_dt
plot(pca_dt, type = "l")
summary(pca_dt)
g <- ggbiplot(pca_dt, choices = 1:2 , obs.scale = 1, var.scale = 1, groups = dt_group, ellipse = TRUE, circle = TRUE) 
g <- g + scale_color_discrete(name = '')
g <- g + theme(legend.direction = 'horizontal', legend.position = 'top')

print(g)

#상관관계 분석 
corrplot((dt), order = "hclust")

cor(dt)



#area 에 연관이 큰 변수 선택

#data sampling 
rn <- createDataPartition(y=firedata$area, p=0.7, list = F)
data_train <- firedata[rn]
data_test <- iris[-rn]
data_train





