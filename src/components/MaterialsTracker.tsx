import { Package, MapPin, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

interface Material {
  id: string;
  name: string;
  supplier: string;
  address: string;
  category: string;
  status: 'ordered' | 'available' | 'needed';
}

const MaterialsTracker = () => {
  const materials: Material[] = [
    {
      id: '1',
      name: 'Hardwood Flooring',
      supplier: 'Boston Lumber Co',
      address: '123 Industrial Pkwy, Boston, MA',
      category: 'Flooring',
      status: 'ordered'
    },
    {
      id: '2',
      name: 'Kitchen Cabinets',
      supplier: 'Cabinet Pro Supply',
      address: '456 Trade St, Cambridge, MA',
      category: 'Cabinets',
      status: 'available'
    },
    {
      id: '3',
      name: 'Granite Countertops',
      supplier: 'Stone & Marble Inc',
      address: '789 Quarry Rd, Somerville, MA',
      category: 'Countertops',
      status: 'needed'
    },
    {
      id: '4',
      name: 'Light Fixtures',
      supplier: 'Electric Supply Hub',
      address: '321 Electric Ave, Boston, MA',
      category: 'Electrical',
      status: 'available'
    },
    {
      id: '5',
      name: 'Bathroom Tiles',
      supplier: 'Tile World',
      address: '654 Design Blvd, Cambridge, MA',
      category: 'Tiles',
      status: 'ordered'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ordered':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">Ordered</span>;
      case 'available':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Available</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-400 text-white">Needed</span>;
    }
  };

  return (
    <div className="materials-tracker-container">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-2" style={{color: '#10B981'}}>
          <Package className="w-6 h-6" />
          Materials & Suppliers
        </h3>
        <p className="text-sm text-gray-600">Track materials and local supplier information</p>
      </div>

      {/* Materials Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-50 border-b-2 border-green-600">
              <th className="p-3 text-left font-semibold text-sm" style={{color: '#059669'}}>Material</th>
              <th className="p-3 text-left font-semibold text-sm" style={{color: '#059669'}}>Supplier</th>
              <th className="p-3 text-left font-semibold text-sm" style={{color: '#059669'}}>Address</th>
              <th className="p-3 text-left font-semibold text-sm" style={{color: '#059669'}}>Status</th>
              <th className="p-3 text-left font-semibold text-sm" style={{color: '#059669'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr 
                key={material.id}
                className={`border-b hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="p-3">
                  <div>
                    <p className="font-semibold text-sm" style={{color: '#10B981'}}>{material.name}</p>
                    <p className="text-xs text-gray-600">{material.category}</p>
                  </div>
                </td>
                <td className="p-3">
                  <p className="text-sm font-medium text-gray-900">{material.supplier}</p>
                </td>
                <td className="p-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{material.address}</p>
                  </div>
                </td>
                <td className="p-3">
                  {getStatusBadge(material.status)}
                </td>
                <td className="p-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    onClick={() => alert(`Order sample for: ${material.name}`)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Order Sample
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-xs font-medium text-blue-900 mb-1">Ordered</p>
          <p className="text-2xl font-bold text-blue-600">
            {materials.filter(m => m.status === 'ordered').length}
          </p>
        </div>
        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
          <p className="text-xs font-medium text-green-900 mb-1">Available</p>
          <p className="text-2xl font-bold text-green-600">
            {materials.filter(m => m.status === 'available').length}
          </p>
        </div>
        <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
          <p className="text-xs font-medium text-gray-900 mb-1">Needed</p>
          <p className="text-2xl font-bold text-gray-600">
            {materials.filter(m => m.status === 'needed').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaterialsTracker;
