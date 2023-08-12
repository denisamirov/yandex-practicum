import Youtube from 'react-youtube'

export const Myoutube = ({video}) => {
  const opts = {
    height: '360',
    width: '100%',
  }
  return (
    <>
    <div>
      <Youtube videoId={video} opts={opts} />
    </div>
    <a href="https://www.youtube.com/watch?v=_49nYU5dEvM">Смотреть на Youtube</a>
    </>
  )
}
