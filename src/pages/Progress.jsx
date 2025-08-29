import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getState } from '../lib/storage'

export default function Progress() {
  const { progress } = getState()

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="page">
          <h2>📈 Progress</h2>
          <div className="card">
            {progress.length === 0 ? (
              <p className="small">No quiz attempts yet. Take a quiz to see progress!</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Type</th>
                    <th>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {progress.map(p => (
                    <tr key={p.id}>
                      <td>{new Date(p.date).toLocaleString()}</td>
                      <td>{p.score}%</td>
                      <td>{p.meta?.type?.toUpperCase()}</td>
                      <td className="badge">{p.meta?.difficulty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
