import Row from 'react-bootstrap/esm/Row'
import { Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export const TaskJs = () => {
  return (
    <>
    <div className='taskCard'>
      <Row>
        <Col>Часто на веб-странице требуется представить информацию в виде графиков, диаграм, схем.
        </Col>
      </Row>
      <Row>
        <Col>
          Для того чтобы это сделать можно воспользоваться открытой библиотекой <strong>Chart.js. </strong>
          С помощью этой библиотеки ты можешь быстро создать инфографику для сайта, используя <b>JavaScript</b>
        </Col>
      </Row>
      <Row><Col>
      <Button href="https://www.chartjs.org/">Узнать о Chart.js</Button>
      </Col></Row>
      <Row><Col>
        Познакомься с простой диаграммой, которую я подготовил на <b>Codepen. </b> 
        В качестве тренеровки попробуй создать диагрармму расходов и доходов за месяц
      </Col></Row>
      <Row><Col>
        <Button href="https://codepen.io/DenisAmirovSS/pen/gOdEzya">Попробовать</Button>
      </Col></Row>
    </div>
    </>
  )
}

