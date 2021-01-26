from math import sqrt
#ex 2
def ex2():
    print('задание 2')
    t = str(input('введите 3 числа через запятую: ')).split(',')
    print('max = ',max(t), '; min = ', min(t))

#ex 3
def ex3():
    print('задание 3')
    from math import sqrt
    t = str(input('введите 3 числа через запятую: ')).split(',')
    pp = (int(t[0])+int(t[1])+int(t[2]))/2.0
    s = sqrt(pp*(pp-int(t[0]))*(pp-int(t[1]))*(pp-int(t[2])))
    print(s)

#ex 4
def ex4():
    print('задание 4')
    g = input('введите вес в граммах: ')
    kg = int(g)/1000.0
    print(kg,'килограмм')
    print(kg/1000.0, 'тонн')

#ex 5
def ex5():
    print('задание 5')
    byte = int(input('введите кол-во байт: '))
    kbyte = byte/1024.0
    mbyte = kbyte/1024.0
    print(kbyte,'- килобайт;',mbyte,'- мегабайт')

#ex 6
def ex6():
    print('задание 6')
    x = int(input('введите x: '))
    y = int(input('введите y: '))
    if (x*y != 0):
        print(1.0/(x*y))

#ex2()
#ex3()
#ex4()
#ex5()
ex6()