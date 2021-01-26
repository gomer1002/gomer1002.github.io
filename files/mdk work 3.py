s=[[123,321,7],(333,222,111),(11,22,33),'sd',(3,2,1),234,5,'Sfa','aaaaaaa',
   'математик','математика','математ',[],[295],'Sd','sD',9,2,1,'1','1',11,' ',
   [9,1,'ss','aa','bb',32,[99,88,77,'aa']],'9','5']
#s = [[5,2],[7],[5],[3],[0],[3,6],[3,6,2]]

class main:
    def sortList(self): #функция для сортировки списка со списками
        #print(inp)
        
        lens = [] #список для записи длинн списков
        for c in list(self): #для каждого с в self 
            lens.append(len(c)) #добавляем в конец lens длинну с
            #print(c,len(c))
            
        kk = [] #список для деления элементов исходного списка по длинне
        j = 0 #счетчик для элементов kk
        for i in range(min(lens), max(lens) + 1):
            #print(i)
            kk.append([]) #добавляем в kk нулевой элемент
            for c in list(self): #проверяем длинну каждого элемента в исходном списке
                if len(c) == i: #если длинна равна индексу, то 
                    #print(c,i)
                    kk[j].append(c) #добавляем этот элемент в конец вложенного в kk списка
            j += 1 #меняем счетчик
        #print(kk,' full kk')
            
        outs = [] #выходной список
        for i in range(0, len(kk)): #для каждого элемента из kk
            #print(kk[i])
            if len(kk[i]) != 0: #если длинна не нулевая (такие есть)
                outs.extend(sorted(kk[i])) #сортируем список со списками одинаковой длинны и расширяем выходной список
                #print(kk[i])
                #print(sorted(kk[i], key = lambda x: x[0]), '\nend kk')
                #print(kk[i][0][0])
        
        #print(outs)
        #print('end def')
        return outs
    
    def getDict(self):
        k = []
        for c in range(0,len(self)):
            k.append([str(self[c]),self[c]])
        d = {}
        d.update(k)
        return d
        
    def stringify(self):
        out = []
        for c in range(0,len(self)):
            out.append(str(self[c]))
        return out
            
    def integify(self, reference, dictionary):
        out = [] #выходной список
        for c in self:#для каждого эл-та во входном списке
            x = str(type(c))[8:11]#проеверяем тип
            if x == 'str':#если строка, то
                num = dictionary.get(c)#пытаемся преобразовать в число
                if (num != None) and (reference.count(num) != 0):#если получилось число и такое число есть в изначальном(опорном) списке
                    out.append(num)#то добавляем его в выходной список
                    reference.remove(num)#и удаляем из изначального списка
                    #print(temp)
                else:
                    out.append(c)#иначе просто добавляем эл-т
            else:
                out.append(c)#иначе просто добавляем эл-т
        return out
        

    def trySort(self): #функция для обработки и сортировки входных данных
        ints = [] #объявляем списки для работы
        strs = []
        lsts = []
        outs = [] #и выходных данных
        for c in list(self): #для кжадого элемента в списке проверяем его тип
            x = str(type(c))[8:11]
            if x == 'int':#если число, то в одну кучу
                ints.append(c)
            elif x == 'str':#если строка, то в другую
                strs.append(c)
            else:#x == 'lst'#иначе сортируем и добавляем в третью кучу
                lsts.append(main.trySort(c))
                #print(c)
          
        dictInts = main.getDict(ints) #создание словаря для перевода из строки в число
        intStr = main.stringify(ints) #список с числами, преобразованными в строки
        
        if len(ints) != 0:
            outs.extend(main.sortList(intStr))
        if len(strs) != 0:#если список со строками не пустой, то
        	outs.extend(main.sortList(strs))#сортируем и добавляем во временный список
        if len(lsts) != 0:#если список со списками не пустой, то
            #print(main.smpl(lsts))
            outs.extend(main.sortList(lsts))#сортируем и добавляем во временный список
        outs = sorted(outs, key = lambda x: len(x))#сортируем выходной список
        outs = main.integify(outs, ints, dictInts)#заменяем строки на числа в выходном списке
        return outs
    
    def test(self):
    	print(self)
    	   	

a = main.trySort(s)
print('in:\t',s,'\n\nout:\t',a)

