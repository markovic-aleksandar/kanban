import { IconBoard } from '../constants/icons';


// list of boards - ovo menjas kasnije sa pravim podacima primices ih kroz props
const boardsList = ['Platform Launch', 'Marketing Plan', 'Roadmap'];

const BoardsList = () => {
  return (
    <div className="BoardsList">
      <p className="BoardsList__count">All boards (3)</p>
      <div className="BoardsList__tabs">
        <button type="button" className="BoardsList__tab">
          <IconBoard color="#828fa3" />
          Platform Launch
        </button>

        <button type="button" className="BoardsList__tab BoardsList__tab--active">
          <IconBoard color="#828fa3" />
          Marketing Plan
        </button>

        <button type="button" className="BoardsList__tab">
          <IconBoard color="#828fa3" />
          Roadmap
        </button>
      </div>
      <button type="button" className="BoardsList__create">
        <IconBoard />
        + Create New Board
      </button>
    </div>
  )
}

export default BoardsList;