import "./widgetLg.css"

export default function WidgeetLg() {
    const Button = ({type}) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    }
  return (
    <div className='widgetLg'>
        <h3 className="widgetLgTitle">Latest Transactions</h3>
        <table className="widgetLgTable">
            <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Status</th>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://images.pexels.com/photos/6324235/pexels-photo-6324235.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate">28 May 2023</td>
                <td className="widgetLgAmount">$122.00</td>
                <td className="widgetLgStauts"><Button type="Approved"/></td>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://images.pexels.com/photos/6324235/pexels-photo-6324235.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate">28 May 2023</td>
                <td className="widgetLgAmount">$122.00</td>
                <td className="widgetLgStauts"><Button type="Declined"/></td>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://images.pexels.com/photos/6324235/pexels-photo-6324235.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate">28 May 2023</td>
                <td className="widgetLgAmount">$122.00</td>
                <td className="widgetLgStauts"><Button type="Pending"/></td>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://images.pexels.com/photos/6324235/pexels-photo-6324235.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate">28 May 2023</td>
                <td className="widgetLgAmount">$122.00</td>
                <td className="widgetLgStauts"><Button type="Approved"/></td>
            </tr>
        </table>
    </div>
  )
}
