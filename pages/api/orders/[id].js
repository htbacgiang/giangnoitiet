import Order from '../../../models/Order';
import db from "../../../utils/db";
export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      await db.connectDb();
      const { id } = req.query;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }

      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({ 
        message: 'Order status updated successfully',
        order 
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await db.connectDb();
      const { id } = req.query;

      const order = await Order.findByIdAndDelete(id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({ 
        message: 'Order deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
