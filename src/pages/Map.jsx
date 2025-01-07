import "../style.scss";
import Navbar from "../components/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import Gallerypage from "./Gallerypage";
import Story from "./Story";
import Contact from "./Contact";
import Forum from "./Forum";
import Cursor from "../components/Cursor";
import 'leaflet/dist/leaflet.css';
import { BiLocationPlus, BiSolidLocationPlus } from 'react-icons/bi';
import { FaLocationDot } from "react-icons/fa6";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import StarRating from '../components/StarRating';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import defaultMarkers from "../components/defaultMarkers";
import taiwanRegions from "../components/taiwanRegions";
import axios from 'axios';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { LogIn } from "lucide-react";
import { presetComments } from '../components/presetComments';
import { templeMarkersComments } from '../components/themeComments';
const DEFAULT_COVER_PHOTO = 'images/default-location.jpg';
const DEFAULT_AVATAR = 'images/Avatars/avatar (1).jpg';
import templeMarkers from "../components/templeMarkers";
import Notice from '../components/Notice';


// 預設搜尋結果標記
const searchResultIcon = L.icon({
  iconUrl: 'images/Map/mark_purple.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});



// 預設與被點擊的圖示
const normalIcon = L.icon({
  iconUrl: 'images/Map/mark_green.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const activeIcon = L.icon({
  iconUrl: 'images/Map/mark_purple.svg',
  iconSize: [38, 38],
  iconAnchor: [16, 32],
  popupAnchor: [0, -38],
});



const handlePopupOpen = (markerId) => {
  setActiveMarkerId(markerId);
};

// 未填入完整時的警告
const CustomAlert = ({ message, onClose }) => (
  <div className="alert-message" style={{
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }}>
    {message}
    <button onClick={onClose} style={{
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: '5px'
    }}>✕</button>
  </div>
);

let DefaultIcon = L.icon({
  iconUrl: 'images/Map/mark_green.svg',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;




export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [editingMarker, setEditingMarker] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const location = useLocation();
  const mapboxAccessToken = 'pk.eyJ1IjoiYWxpc29uMzQ2MDciLCJhIjoiY201ODlqM2U5M2o2MDJscHpiMWF6NzczdSJ9.D76vzn6QIzDViT9R7nVPVA';
  const mapboxStyleURL = `https://api.mapbox.com/styles/v1/alison34607/cm589twvs00nz01sp790tayrs/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxAccessToken}`;
  const [isAddingLocation, setIsAddingLocation] = useState(false);


  useEffect(() => {
    // 當路由變更時，將頁面滾動到頂部
    window.scrollTo(0, 0);
  }, [location]);



  useEffect(() => {
    // 初始化標記時加載評論
    const markersWithComments = defaultMarkers.map(marker => {
      const pageComments = presetComments[`page${marker.pageId}`] || [];
      return {
        ...marker,
        comments: pageComments
      };
    });

    setMarkers(markersWithComments);
    setDisplayedMarkers(markersWithComments);
  }, []);




  const SearchControl = () => {
    const map = useMap();

    useEffect(() => {
      let searchMarker = null;

      const provider = new OpenStreetMapProvider({
        params: {
          'accept-language': 'zh',
          countrycodes: 'tw'
        },
      });
      
      // 自定搜尋結果的標記
      const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        showMarker: true,
        showPopup: false,
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: true,
        searchLabel: '搜尋地址...',
        keepResult: true,
        marker: {

          icon: searchResultIcon,
          draggable: false,
        }
      });

      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  };



  // 點擊地圖外區域時關閉新增模式和提示
  useEffect(() => {
    const handleClickOutside = (e) => {
      const mapContainer = document.querySelector('.map-wrapper');
      if (mapContainer && !mapContainer.contains(e.target) && isAddingLocation) {
        setIsAddingLocation(false);
        setShowAlert(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isAddingLocation]);



  // 收藏
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  //初始化收藏列表
  useEffect(() => {
    const savedFavorites = localStorage.getItem('mapFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // 收藏相關功能
  const toggleFavorite = (marker) => {
    setFavorites(prev => {
      const isFavorited = prev.some(fav => fav.id === marker.id);
      let newFavorites;

      if (isFavorited) {
        newFavorites = prev.filter(fav => fav.id !== marker.id);
      } else {
        newFavorites = [...prev, marker];
      }

      localStorage.setItem('mapFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (markerId) => {
    return favorites.some(fav => fav.id === markerId);
  };




  // 評論編輯與否狀態
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const taiwanBounds = [
    [21.8, 119.3],
    [25.3, 122.0]
  ];

 
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingComment(null);
  };

  const handleDeleteMarker = (markerId) => {
    if (window.confirm('確定要刪除這個標記嗎？')) {
      const updatedMarkers = markers.filter(marker => marker.id !== markerId);
      setMarkers(updatedMarkers);
      updateDisplayedMarkers(updatedMarkers);
    }
  };

  const validateMarker = (markerData) => {
    if (!markerData.title || markerData.title.trim() === '') {
      setAlertMessage('請輸入地點名稱');
      setShowAlert(true);
      return false;
    }
    return true;
  };
  // 提交標記
  const handleMarkerSubmit = (markerId) => {
    if (!validateMarker(editingMarker)) {
      const updatedMarkers = markers.filter(marker => marker.id !== markerId);
      setMarkers(updatedMarkers);
      updateDisplayedMarkers(updatedMarkers);
      setEditingMarker(null);
      return;
    }

    if (editingMarker.title.length > 7) {
      setAlertMessage('地點名稱不得超過7個字');
      setShowAlert(true);
      return;
    }
    const updatedMarkers = markers.map(marker =>
      marker.id === markerId
        ? {
          ...marker,
          title: editingMarker.title,
          coverPhoto: editingMarker.coverPhoto || DEFAULT_COVER_PHOTO,
          comments: editingMarker.comments || [],
          city: editingMarker.city,
          district: editingMarker.district
        }
        : marker
    );

    setMarkers(updatedMarkers);
    updateDisplayedMarkers(updatedMarkers);
    setEditingMarker(null);
    setShowAlert(false);
  };

  // 更新評論處理函數
  const handleSubmitComment = (markerId, commentData) => {
    setMarkers(prev => prev.map(marker => {
      if (marker.id === markerId) {
        const currentComments = marker.comments || [];

        if (isEditing) {
          // 更新現有評論
          const updatedComments = currentComments.map(comment =>
            comment.id === editingComment.id
              ? { ...comment, ...commentData, isEdited: true }
              : comment
          );
          return { ...marker, comments: updatedComments };
        } else {
          // 檢查是否已有評論
          const hasComment = currentComments.some(
            comment => comment.userId === 'user123'
          );

          if (hasComment) {
            setAlertMessage('每個用戶只能發表一則評論，請編輯現有評論');
            setShowAlert(true);
            return marker;
          }

          // 新增評論
          const newComment = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...commentData
          };
          return { ...marker, comments: [newComment, ...currentComments] };
        }
      }
      return marker;
    }));

    // 重置編輯狀態
    if (isEditing) {
      setIsEditing(false);
      setEditingComment(null);
    }
  };

  const handleEditComment = (markerId, comment) => {
    if (comment && comment.id) {
      setIsEditing(true);
      setEditingComment(comment);
    } else {
      console.error('編輯評論時發生錯誤', comment);
    }
  };

  // 清除資料不全的標記
  const handleCancelMarkerEdit = (markerId) => {
    const marker = markers.find(m => m.id === markerId);
    if (!marker.title || marker.title.trim() === '') {
      const updatedMarkers = markers.filter(m => m.id !== markerId);
      setMarkers(updatedMarkers);
      updateDisplayedMarkers(updatedMarkers);
    }
    setEditingMarker(null);
  };

  // 新增標記時反推地理編碼
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=zh-TW`
      );

      const address = response.data.address;
      console.log('Raw address data:', address);

      // 處理城市名稱
      let city = address.city ||
        address.county ||
        address.town ||
        '未分類';

      // 標準化城市名稱
      if (city !== '未分類') {
        // 將"臺"統一改為"台"
        city = city.replace(/臺/g, '台');

        // 移除已有的"市"或"縣"後綴，然後重新添加
        city = city.replace(/(市|縣)$/, '');

        // 根據城市名稱添加正確的後綴
        if (['台北', '新北', '桃園', '台中', '台南', '高雄'].includes(city)) {
          city += '市';
        } else if (city !== '未分類') {
          city += '縣';
        }
      }

      // 處理區域名稱
      let district = address.suburb ||
        address.village ||
        address.town_division ||
        address.neighbourhood ||
        '未分類';

      if (district !== '未分類') {
        // 移除原定的後綴
        district = district.replace(/(區|鄉|鎮|市)$/, '');

        // 添加適用的後綴
        if (city.endsWith('市')) {
          district += '區';
        } else if (city.endsWith('縣')) {
          district += '區';
        }
      }

      console.log('Processed location:', { city, district });
      return { city, district };
    } catch (error) {
      console.error('Geocoding error:', error);
      return { city: '未分類', district: '未分類' };
    }
  };

  const AddMarker = () => {
    const map = useMapEvents({
      dblclick: async (e) => {
        if (!isAddingLocation) return;

        const { lat, lng } = e.latlng;

        if (lat < taiwanBounds[0][0] || lat > taiwanBounds[1][0] ||
          lng < taiwanBounds[0][1] || lng > taiwanBounds[1][1]) {
          setAlertMessage('請在台灣地區範圍內新增標記');
          setShowAlert(true);
          return;
        }

        // 獲取地理位置資訊
        const { city, district } = await reverseGeocode(lat, lng);

        const generateId = () => `${Date.now()}-${crypto.randomUUID()}`;

        const newMarker = {
          id: generateId(),
          position: [lat, lng],
          title: '',
          coverPhoto: DEFAULT_COVER_PHOTO,
          userId: 'user123',
          userName: '訪客',
          userAvatar: DEFAULT_AVATAR,
          comments: [],
          city: city,
          district: district
        };


        const updatedMarkers = [...markers, newMarker];
        setMarkers(updatedMarkers);

        updateDisplayedMarkers(updatedMarkers);

        setEditingMarker(newMarker);

        // 成功新增標記後，關閉新增位置模式
        setIsAddingLocation(false);
      },
      click: () => {
        setActiveMarkerId(null);
        if (editingMarker && (!editingMarker.title || editingMarker.title.trim() === '')) {
          const updatedMarkers = markers.filter(marker => marker.id !== editingMarker.id);
          setMarkers(updatedMarkers);
          updateDisplayedMarkers(updatedMarkers);
          setEditingMarker(null);
        }
      }
    });
    return null;
  };
  const updateDisplayedMarkers = (markersList) => {
    let filtered = [...markersList];

    if (selectedCity) {
      filtered = filtered.filter(marker => marker.city === selectedCity);
    }

    if (selectedDistrict) {
      filtered = filtered.filter(marker => marker.district === selectedDistrict);
    }

    setDisplayedMarkers(filtered);
  };

  /* 篩選已標註地圖 */
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [displayedMarkers, setDisplayedMarkers] = useState([]);
  const mapRef = useRef(null);

  // 初始化標記
  useEffect(() => {
    const allMarkers = [...defaultMarkers];
    setMarkers(allMarkers);
    setDisplayedMarkers(allMarkers);
  }, []);

  // 新增座標鼠標
  useEffect(() => {
    if (isAddingLocation) {
      document.body.classList.add('adding-location');
    } else {
      document.body.classList.remove('adding-location');
    }

    return () => {
      document.body.classList.remove('adding-location');
    };
  }, [isAddingLocation]);





  // 新增圖片檔案名稱

  const [fileName, setFileName] = useState("未選擇文件");


  // 處理縣市選擇
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedDistrict("");

    if (city && taiwanRegions[city]) {
      setAvailableDistricts(taiwanRegions[city]);
    } else {
      setAvailableDistricts([]);
    }

    filterMarkers(city, "");
  };

  // // 處理區域選擇
  // const handleDistrictChange = (e) => {
  //   const district = e.target.value;
  //   setSelectedDistrict(district);
  //   filterMarkers(selectedCity, district);
  // };

  // 篩選標記
  const filterMarkers = (city, district, markersList = markers) => {
    let filtered = [...markersList];

    if (city) {
      filtered = filtered.filter(marker => marker.city === city);
    }

    if (district) {
      filtered = filtered.filter(marker => marker.district === district);
    }

    setDisplayedMarkers(filtered);
  };

  // 跳轉到指定標記
  const handleMarkerClick = (marker, e) => {
    const map = mapRef.current;
    if (!map) return;

    // 避免重複觸發
    if (activeMarkerId === marker.id) return;

    // 先關閉當前打開的 popup
    map.closePopup();

    // 計算地圖中心點偏移
    const targetLat = marker.position[0];
    const targetLng = marker.position[1];

    // 獲取當前地圖的邊界
    const bounds = map.getBounds();
    const latDiff = bounds._northEast.lat - bounds._southWest.lat;

    // 計算新的中心點，將標記位置設在視圖下方 40% 的位置
    const offsetLat = targetLat + (latDiff * 0.4);

    // 更新 activeMarkerId
    setActiveMarkerId(marker.id);

    // 分兩步進行：先移動地圖，等地圖穩定後再打開 popup
    map.once('moveend', () => {
      // 地圖移動完成後，確保找到正確的標記
      const findAndOpenMarker = () => {
        const targetMarker = findMarkerByLatLng(map, marker.position[0], marker.position[1]);
        if (targetMarker) {
          targetMarker.openPopup();
        }
      };

      // 給系統一點時間確保標記已經完全加載
      setTimeout(findAndOpenMarker, 500);
    });

    // 開始地圖移動
    map.flyTo(
      [offsetLat, targetLng],
      16,
    );
  };

  // 輔助通過經緯度找到對應的標記
  const findMarkerByLatLng = (map, lat, lng) => {
    let targetMarker = null;
    const threshold = 0.0000001; // 容許的誤差範圍

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const pos = layer.getLatLng();
        if (
          Math.abs(pos.lat - lat) < threshold &&
          Math.abs(pos.lng - lng) < threshold
        ) {
          targetMarker = layer;
        }
      }
    });

    return targetMarker;
  };
  // 關閉標記卡片
  const handlePopupClose = () => {
    setActiveMarkerId(null);
  };

  // 移除收藏地點
  const handleRemoveFavorite = (e, marker) => {
    e.stopPropagation();
    setFavorites(prev => prev.filter(fav => fav.id !== marker.id));
    localStorage.setItem('mapFavorites', JSON.stringify(
      favorites.filter(fav => fav.id !== marker.id)
    ));
  };
  useEffect(() => {
    console.log('showFavorites changed:', showFavorites);
  }, [showFavorites]);


  const [currentTheme, setCurrentTheme] = useState('default');
  const handleThemeToggle = (theme) => {
    setCurrentTheme(theme);
    if (theme === 'default') {
      setMarkers(defaultMarkers); // 使用 defaultMarkers
      setDisplayedMarkers(defaultMarkers);
    } else if (theme === 'temple') {
      setMarkers(templeMarkers); // 使用 templeMarkers
      setDisplayedMarkers(templeMarkers);
    }
  };
  return (
    <>

      <Routes>
        <Route
          path="/"
          element={
            <main className="map">
              <Cursor isAddingLocation={isAddingLocation} />
              {showAlert && (
                <CustomAlert
                  message={alertMessage}
                  onClose={() => setShowAlert(false)}
                />
              )}


              <div className="map-content">
                <div className="map-left">
                  <div className="btn-group">
                    <button
                      onClick={() => handleThemeToggle('default')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme === 'default'
                        ? 'theme-active'
                        : 'theme-unactive'
                        }`}
                    >
                      找飄點
                    </button>
                    <button
                      onClick={() => handleThemeToggle('temple')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme === 'temple'
                        ? 'theme-active'
                        : 'theme-unactive'
                        }`}
                    >
                      找宮廟
                    </button>
                  </div>
                  <div className="map-wrapper">
                    <MapContainer
                      center={[23.5, 121]}
                      zoom={8}
                      style={{ height: "100%", width: "100%" }}
                      maxBounds={taiwanBounds}
                      minZoom={7}
                      maxBoundsViscosity={1.0}
                      markers={displayedMarkers}
                      onMarkerClick={handleMarkerClick}
                      ref={mapRef}

                    >
                      <TileLayer
                        url={mapboxStyleURL}
                        maxZoom={22}
                        attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                      />
                      <SearchControl />
                      <AddMarker />
                      {markers.map(marker => (
                        <Marker
                          key={marker.id}
                          position={marker.position}
                          icon={marker.id === activeMarkerId ? activeIcon : normalIcon}
                          eventHandlers={{
                            click: (e) => {
                              e.originalEvent?.stopPropagation();
                              setActiveMarkerId(marker.id);
                            },
                            popupclose: () => {
                              setActiveMarkerId(null);
                            }
                          }}
                        >
                          <Popup
                            className="custom-popup"
                            onOpen={() => setActiveMarkerId(marker.id)}
                            onClose={() => setActiveMarkerId(null)}
                          >
                            {editingMarker?.id === marker.id ? (
                              <div className="marker-form">
                                <div className="user-info">
                                  <div className="user-avatar">
                                    <img
                                      src={marker.userAvatar}
                                      alt={marker.userName}
                                    />
                                  </div>
                                  <span className="user-name">{marker.userName}</span>
                                </div>
                                <input
                                  type="text"
                                  placeholder="輸入地點名稱 *"
                                  value={editingMarker.title || ''}
                                  onChange={(e) => {
                                    setEditingMarker({
                                      ...editingMarker,
                                      title: e.target.value
                                    });
                                  }}
                                />
                                <div className="file-upload">
                                  <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (file) {
                                        // 更新檔案名稱狀態
                                        setFileName(file.name);
                                        // 更新編輯標記的封面照片
                                        setEditingMarker({
                                          ...editingMarker,
                                          coverPhoto: URL.createObjectURL(file),
                                        });
                                      } else {
                                        // 如果未選擇檔案，重置檔案名稱
                                        setFileName('未選擇檔案');
                                      }
                                    }}
                                  />
                                  <label htmlFor="file-upload" className="upload-button">
                                    上傳圖片
                                  </label>
                                  {/* 顯示所選檔案的名稱 */}
                                  <p>{fileName}</p>
                                </div>
                                <div className="button-group">
                                  <button
                                    button onClick={() => handleMarkerSubmit(marker.id)}
                                    className="toggle-add-location"
                                  >
                                    {isAddingLocation ? <BiSolidLocationPlus /> : <BiLocationPlus />} 新增座標
                                  </button>
                                  <button
                                    onClick={() => handleCancelMarkerEdit(marker.id)}
                                    className="cancel-button"
                                  >
                                    取消
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="marker-display">
                                <div className="location-info">
                                  <div className="marker-header">
                                    <div className="user-info">
                                      <div className="user-avatar">
                                        <img
                                          src={marker.userAvatar}
                                          alt={marker.userName}
                                        />
                                      </div>
                                      <span className="user-name">{marker.userName}</span>
                                      <p>投稿</p>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(marker);
                                      }}
                                      className={`favorite-button ${isFavorite(marker.id) ? 'active' : ''}`}
                                    >
                                      {isFavorite(marker.id) ? <BsBookmarkFill /> : <BsBookmark />}
                                    </button>
                                    {marker.userId === 'user123' && (
                                      <div className="button-group">
                                        <button onClick={() => setEditingMarker(marker)}>
                                          編輯
                                        </button>
                                        <p>|</p>
                                        <button
                                          onClick={() => handleDeleteMarker(marker.id)}
                                          className="delete-button"
                                        >
                                          刪除
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  <img
                                    src={marker.coverPhoto || DEFAULT_COVER_PHOTO}
                                    alt={marker.title}
                                    className="marker-image"
                                  />
                                  <h3>{marker.title}</h3>

                                  <div className="user-rating">
                                    <div className="average-rating">
                                      <StarRating
                                        rating={
                                          marker.comments?.length > 0
                                            ? marker.comments.reduce((acc, comment) => acc + comment.rating, 0) / marker.comments.length
                                            : 0
                                        }
                                      />
                                      <span className="comments-num">
                                        {marker.comments?.length || 0} 則評論
                                      </span>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="comments-area">
                                    <CommentForm
                                      onSubmit={(commentData) => handleSubmitComment(marker.id, commentData)}
                                      existingComment={editingComment}
                                      isEditing={isEditing}
                                      onCancelEdit={handleCancelEdit}
                                      comments={marker.comments || []}
                                      onEditComment={(comment) => handleEditComment(marker.id, comment)}
                                      rows={3}
                                    />
                                    <CommentList
                                      comments={marker.comments || []}
                                      onEditComment={(comment) => handleEditComment(marker.id, comment)}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                </div>

                <div className="list-panel" >
                  <div className="control-panel">
                    <div className="message">
                      <Notice
                        isVisible={isAddingLocation}
                        message="在地圖內雙擊即可新增座標"
                      />
                    </div>
                    <div className="icon-btn">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFavorites(!showFavorites);
                        }}
                        className="toggle-favorites"
                      >
                        {showFavorites ? <BsBookmarkFill /> : <BsBookmark />} 收藏列表
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAddingLocation(!isAddingLocation);
                        }}
                        className="toggle-add-location"
                      >
                        {isAddingLocation ? <BiSolidLocationPlus /> : <BiLocationPlus />} 新增座標
                      </button>
                    </div>
                  </div>
                  <label className="filter-panel">
                    <div className="filter-controls">
                      <div className="select-control">
                        <div className="select-container">
                          <select
                            value={selectedCity}
                            onChange={(e) => {
                              setShowFavorites(false); // 切換回縣市篩選模式
                              handleCityChange(e);
                            }}
                            className="city-select"
                          >
                            <option value="">選擇縣市</option>
                            {Object.keys(taiwanRegions).map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>

                        <div className="select-container">
                          <select
                            value={selectedDistrict}
                            onChange={(e) => {
                              setShowFavorites(false);
                              const district = e.target.value;
                              setSelectedDistrict(district);
                              filterMarkers(selectedCity, district);
                            }}
                            className="district-select"
                            disabled={!selectedCity}
                          >
                            <option value="">選擇區域</option>
                            {availableDistricts.map(district => (
                              <option key={district} value={district}>{district}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </label>

                  <div className="marker-list">
                    {showFavorites ? (
                      <div className="favorites-panel">
                        <div className="list-area" >
                          <h3>已收藏的地點</h3>
                          <div className="list-section">
                            <ul className="favorites-list">
                              {favorites.length > 0 ? (
                                favorites.map(marker => (
                                  <li onClick={(e) => handleMarkerClick(marker, e)} className="marker-list-item">
                                    <div className="adress">
                                      <BsBookmarkFill className="bookmark-icon" /> {marker.title} - {marker.city}{marker.district}
                                    </div>
                                    <hr />
                                  </li>
                                ))
                              ) : (
                                <li className="no-favorites">目前沒有收藏的地點。</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="markers-panel">
                        <div className="list-area" >
                          <h3>標記點列表</h3>
                          <div className="list-section">

                            <ul className="all-list">
                              {displayedMarkers.map(marker => (
                                <li
                                  key={marker.id}
                                  onClick={(e) => handleMarkerClick(marker, e)}
                                  className="marker-list-item"
                                >
                                  <div className="adress-group">
                                    <div className="adress"> {isFavorite(marker.id) ? (
                                      <BsBookmarkFill
                                        className="bookmark-icon"
                                        onClick={(e) => handleRemoveFavorite(e, marker)}
                                      />
                                    ) : (
                                      <FaLocationDot className="location-icon" />
                                    )}
                                      {marker.title} - {marker.city}{marker.district}
                                    </div>
                                    <div className="marker-list-rating">
                                      <StarRating
                                        rating={
                                          marker.comments.reduce((acc, comment) => acc + comment.rating, 0) /
                                          marker.comments.length
                                        }
                                      />
                                      <span className="comments-count">({marker.comments?.length || 0})</span>
                                    </div>
                                  </div>

                                  <hr />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
              <section className="top-markers">
                <div className="heading">
                  <img src="images/Map/TOP-MARKERS.svg" alt="TOP-MARKERS" className="TOP-MARKERS" />
                  <img src="images/Map/everyone-search.svg" alt="everyone-search" className="everyone-search" />
                </div>
                <div className="top-list">
                  <div className="row">
                    <div className="top-item">
                      <div className="img-wrapper">
                        <img src="images/Map/thumb1.jpg" alt="民雄鬼屋縮圖" />
                      </div>
                      <div className="top-discription">
                        <h2><Link to="/page/1">民雄鬼屋</Link></h2>
                        <p>劉家古厝，又稱民雄鬼屋，是位於臺灣嘉義縣民雄鄉興中村的閩洋折衷主義民宅，
                          當地劉姓望族在1929年所建，戰後搬離後年久失修、荒煙蔓草，引起靈異傳說，成為當地觀光景點。</p>
                      </div>
                    </div>
                    <div className="top-item">
                      <div className="img-wrapper">
                        <img src="images/Map/thumb2.jpg" alt="辛亥隧道縮圖" />
                      </div>
                      <div className="top-discription">
                        <h2><Link to="/page/2">辛亥隧道</Link></h2>
                        <p>「辛亥隧道」這座赫赫有名的猛鬼隧道，位於台北市文山區，是連接大安跟文山兩區的隧道。由於隧道開挖當時的山上是墳墓用地，大安區一側的出口又是第二殯儀館，因此辛亥隧道自開通以來便流傳著許多傳說。</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="top-item">
                      <div className="img-wrapper">
                        <img src="images/Map/thumb3.jpg" alt="林開郡洋樓縮圖" />
                      </div>
                      <div className="top-discription">
                        <h2><Link to="/page/3">林開郡洋樓</Link></h2>
                        <p>林開郡洋樓是一棟位於臺灣基隆市仁愛區的宅邸建築，是基隆市至今保存之日治時代民間建築中最龐大者，目前仍未具文化資產身分</p>
                      </div>
                    </div>
                    <div className="top-item">
                      <div className="img-wrapper">
                        <img src="images/Map/thumb4.jpg" alt="西寧國宅縮圖" />
                      </div>
                      <div className="top-discription">
                        <h2><Link to="/page/4">西寧國宅</Link></h2>
                        <p>「西寧國宅」鄰近西門町商圈，附近生活機能完善、交通便利，然而兇殺與輕生事件頻傳，自1981年建成以來，至少傳出30起命案，讓這處國宅成為網路上知名的「猛鬼大樓」。不過最近傳出台北市政府因西寧國宅建築結構老舊，補強效益不佳為由，決定將該國宅拆除，「猛鬼大樓」的傳說，或許也將就此告一段落。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <footer>
                <div className="content">
                  <div className="left">
                    <ul className="link">
                      <li>
                        <Link to="/">首頁</Link>
                      </li>
                      <li>
                        <Link to="/Story">怪奇博物館</Link>
                      </li>
                      <li>
                        <Link to="/Map">靈異導航</Link>
                      </li>
                      <li>
                        <Link to="/Forum">鬼影探索</Link>
                      </li>
                    </ul>
                    <small>&copy; 2024 Mystic Markers. All Rights Reserved.</small>
                  </div>
                  <img src="images/LOGO_footer.svg" alt="神秘座標" />
                </div>
              </footer>


            </main>
          }
        />

        <Route path="/page/:pageId" element={<Gallerypage />} />
        <Route path="/Story" element={<Story />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/" element={<App />} />
      </Routes>
    </>
  );
}